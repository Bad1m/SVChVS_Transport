import React, { useEffect, useState } from "react";
import { Row, Button, FormLabel, Col, Container } from "react-bootstrap";
import { returnInputTransportConfiguration } from "../../Utility/InputTransportConfiguration";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import Aux from "react-aux";

export default function DeleteTransport() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.repository);
  const state = useSelector((state) => state);
  const { showSuccessModal } = useSelector((state) => state.repository);
  const { showErrorModal } = useSelector((state) => state.errorHandler);
  const { errorMessage } = useSelector((state) => state.errorHandler);
  const [transportForm, setTransportForm] = useState({});

  const navigate = useNavigate();

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("transport", { ...state }));
    navigate("/transport");
  };

  useEffect(() => {
    const url = "/api/transport/" + id;
    //dispatch(getData(url, ))

    const props = {
      showSuccessModal: showSuccessModal,
      showErrorModal: showErrorModal,
      errorMessage: errorMessage,
    };
    dispatch(repositoryActions.getData(url, props));
  }, []);

  useEffect(() => {
    if (data) {
      const transportForm = returnInputTransportConfiguration();

      transportForm.number.value = data.number;

      transportForm.type.value = data.type;

      transportForm.capacity.value = data.capacity;

      transportForm.weight.value = data.weight;

      transportForm.speed.value = data.speed;

      transportForm.technicalСondition.value = data.technicalСondition;

      setTransportForm(transportForm);
    }
  }, [data]);

  const deleteTransport = (event) => {
    event.preventDefault();

    const url = "/api/transport/" + data.id;

    const props = {
      showSuccessModal: showSuccessModal,
      showErrorModal: showErrorModal,
      errorMessage: errorMessage,
    };

    dispatch(repositoryActions.deleteData(url, props));
  };

  // let client = { data };
  return (
    <Aux>
      <Row>
        <Col md={10}>
          <Container>
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
                <FormLabel htmlFor="type">Тип:</FormLabel>
              </Col>
              <Col md={7}>
                <span type="type">{data.type}</span>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormLabel htmlFor="capacity">Вместимость:</FormLabel>
              </Col>
              <Col md={7}>
                <span capacity="capacity">{data.capacity}</span>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <FormLabel htmlFor="weight">Масса:</FormLabel>
              </Col>
              <Col md={7}>
                <span weight="weight">{data.weight}</span>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <FormLabel htmlFor="speed">Скорость:</FormLabel>
              </Col>
              <Col md={7}>
                <span speed="speed">{data.speed}</span>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <FormLabel htmlFor="technicalСondition">
                  Техническое состояние:
                </FormLabel>
              </Col>
              <Col md={7}>
                <span technicalСondition="technicalСondition">
                  {data.technicalСondition}
                </span>
              </Col>
            </Row>

            <Row>
              <Col mdoffset={8} md={1}>
                <Button type="submit" onClick={deleteTransport}>
                  Удалить
                </Button>
              </Col>
              <Col md={1}>
                <Button onClick={() => navigate("/transport")}>Отмена</Button>
              </Col>
            </Row>
          </Container>
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
