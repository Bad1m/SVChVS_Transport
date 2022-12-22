import React, { useEffect, useState } from "react";
import { Row, Button, FormLabel, Col, Container } from "react-bootstrap";
import { returnInputClientConfiguration } from "../../Utility/InputClientConfiguration";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import Aux from "react-aux";

export default function DeleteClient() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.repository);
  const state = useSelector((state) => state);
  const { showSuccessModal } = useSelector((state) => state.repository);
  const { showErrorModal } = useSelector((state) => state.errorHandler);
  const { errorMessage } = useSelector((state) => state.errorHandler);
  const [clientForm, setClientForm] = useState({});

  const navigate = useNavigate();

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("client", { ...state }));
    navigate("/clients");
  };

  useEffect(() => {
    const url = "/api/client/" + id;

    const props = {
      showSuccessModal: showSuccessModal,
      showErrorModal: showErrorModal,
      errorMessage: errorMessage,
    };
    dispatch(repositoryActions.getData(url, props));
  }, []);

  useEffect(() => {
    if (data) {
      const clientForm = returnInputClientConfiguration();

      clientForm.lastName.value = data.lastName;
      clientForm.firstName.value = data.firstName;
      clientForm.patronymic.value = data.patronymic;
      clientForm.number.value = data.number;
      clientForm.price.value = data.price;

      setClientForm(clientForm);
    }
  }, [data]);

  const deleteClient = (event) => {
    event.preventDefault();

    const url = "/api/client/" + data.id;

    const props = {
      showSuccessModal: showSuccessModal,
      showErrorModal: showErrorModal,
      errorMessage: errorMessage,
    };

    dispatch(repositoryActions.deleteData(url, props));
  };

  return (
    <Aux>
      <Row>
        <Col md={10}>
          {data && (
            <Container>
              <Row>
                <Col md={3}>
                  <FormLabel htmlFor="lastName">Фамилия:</FormLabel>
                </Col>
                <Col md={7}>
                  <span lastName="lastName">{data.lastName}</span>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormLabel htmlFor="firstName">Имя:</FormLabel>
                </Col>
                <Col md={7}>
                  <span firstName="firstName">{data.firstName}</span>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormLabel htmlFor="patronymic">Отчество:</FormLabel>
                </Col>
                <Col md={7}>
                  <span patronymic="patronymic">{data.patronymic}</span>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormLabel htmlFor="number">Номер:</FormLabel>
                </Col>
                <Col md={7}>
                  <span number="number">{data.number}</span>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormLabel htmlFor="price">Цена:</FormLabel>
                </Col>
                <Col md={7}>
                  <span price="price">{data.price}</span>
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
          )}
        </Col>
      </Row>
      <SuccessModal
        show={state.repository.showSuccessModal}
        modalHeaderText={"Сообщение"}
        modalBodyText={"Успешно удалено"}
        okButtonText={"OK"}
        successClick={closeSuccessModal}
      />
      <ErrorModal
        show={state.errorHandler.showErrorModal}
        modalHeaderText={"Сообщение об ошибке"}
        modalBodyText={state.errorHandler.errorMessage}
        okButtonText={"OK"}
        closeModal={() => dispatch(errorHandlerActions.closeErrorModal())}
      />
    </Aux>
  );
}
