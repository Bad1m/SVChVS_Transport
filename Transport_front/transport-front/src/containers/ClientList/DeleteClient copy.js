import React, { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import { Row, Button, FormLabel, Col, Container } from "react-bootstrap";
import { returnInputClientConfiguration } from "../../Utility/InputClientConfiguration";
import * as formUtilityActions from "../../Utility/ClientFormUtility";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import Aux from "react-aux";
import axios from "axios";

export default function DeleteClient() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/client" + data.id;
      const response = await axios.get(url);
      setData(response.data);
    };

    fetchData().catch(console.error);
  }, []);

  const navigate = useNavigate();

  //   const componentDidMount = () => {
  //     const id = match.params.id;
  //     const url = "/api/client/" + id;
  //     this.props.onGetClientById(url, { ...this.props });
  //   };

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("client", { ...state }));
    navigate("/clients");
  };

  const deleteClient = (event) => {
    event.preventDefault();

    const url = "/api/client/" + data.id;

    dispatch(repositoryActions.deleteData(url, data));
  };

  let client = { data };
  return (
    <Aux>
      <Row>
        <Col md={10}>
          <Container>
            <Row>
              <Col md={3}>
                <FormLabel htmlFor="lastName">Фамилия:</FormLabel>
              </Col>
              <Col md={7}>
                <span lastName="lastName">{client.lastName}</span>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormLabel htmlFor="firstName">Имя:</FormLabel>
              </Col>
              <Col md={7}>
                <span firsttName="firstName">{client.firstName}</span>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormLabel htmlFor="patronymic">Отчество:</FormLabel>
              </Col>
              <Col md={7}>
                <span patronymic="patronymic">{client.patronymic}</span>
              </Col>
            </Row>

            <Row>
              <Col mdoffset={8} md={1}>
                <Button type="submit" onClick={deleteClient}>
                  Удалить
                </Button>
              </Col>
              <Col md={1}>
                <Button onClick={() => navigate("/clients")}>Отмена</Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <SuccessModal
        show={state.repository.showSuccessModal}
        modalHeaderText={"Success message"}
        modalBodyText={"Action completed successfully"}
        okButtonText={"OK"}
        successClick={closeSuccessModal}
      />
      <ErrorModal
        show={state.errorHandler.showErrorModa}
        modalHeaderText={"Error message"}
        modalBodyText={state.errorHandler.errorMessage}
        okButtonText={"OK"}
        closeModal={() => dispatch(errorHandlerActions.closeErrorModal())}
      />
    </Aux>
  );
}
