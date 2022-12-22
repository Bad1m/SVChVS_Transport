import React, { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Button, FormGroup, Col, Container, Row } from "react-bootstrap";
import { returnInputTransportConfiguration } from "../../Utility/InputTransportConfiguration";
import * as formUtilityActions from "../../Utility/TransportFormUtility";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";

export default function CreateTransport() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isFormValid, setFormValid] = useState(false);
  const [formElementsArray, setFormElementsArray] = useState([]);

  const [transportForm, setTransportForm] = useState({});

  useEffect(() => {
    const transportForm = returnInputTransportConfiguration();
    setTransportForm(transportForm);
    setFormElementsArray(
      formUtilityActions.convertStateToArrayOfFormObjects(transportForm)
    );
  }, []);

  const navigate = useNavigate();

  const handleChangeEvent = (event, id) => {
    const updatedTransportForm = transportForm;
    updatedTransportForm[id] =
      formUtilityActions.executeValidationAndReturnFormElement(
        event,
        updatedTransportForm,
        id
      );

    const counter =
      formUtilityActions.countInvalidElements(updatedTransportForm);

    setFormElementsArray(
      formUtilityActions.convertStateToArrayOfFormObjects(updatedTransportForm)
    );
    setTransportForm(updatedTransportForm);
    setFormValid(counter === 0);
  };

  const createClient = (event) => {
    event.preventDefault();

    const TransportToCreate = {
      number: transportForm.number.value,
      type: transportForm.type.value,
      capacity: transportForm.capacity.value,
      weight: transportForm.weight.value,
      speed: transportForm.speed.value,
      technicalСondition: transportForm.technicalСondition.value,
    };

    const url = "/api/transport";
    const props = {
      showSuccessModal: state.repository.showSuccessModal,
      showErrorModal: state.errorHandler.showErrorModal,
      errorMessage: state.errorHandler.errorMessage,
    };
    dispatch(repositoryActions.postData(url, TransportToCreate, props));
  };

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("transport", { ...state }));
    navigate("/transport");
  };

  return (
    <Container>
      <Form onSubmit={createClient}>
        {formElementsArray.map((element) => {
          return (
            <Input
              key={element.id}
              elementType={element.config.element}
              id={element.id}
              label={element.config.label}
              type={element.config.type}
              value={element.config.value}
              changed={(event) => handleChangeEvent(event, element.id)}
              errorMessage={element.config.errorMessage}
              invalid={!element.config.valid}
              shouldValidate={element.config.validation}
              touched={element.config.touched}
              blur={(event) => handleChangeEvent(event, element.id)}
            />
          );
        })}
        <br />
        <FormGroup>
          <Row>
            <Col mdoffset={6} md={1}>
              <Button type="submit" disabled={!isFormValid}>
                Создать
              </Button>
            </Col>

            <Col md={1}>
              <Button onClick={() => navigate("/transport")}>Отмена</Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>

      <SuccessModal
        show={state.repository.showSuccessModal}
        modalHeaderText={"Сообщение"}
        modalBodyText={"Успешно удалено"}
        okButtonText={"OK"}
        successClick={closeSuccessModal}
      />

      <ErrorModal
        show={state.errorHandler.showErrorModa}
        modalHeaderText={"Сообщение об ошибке"}
        modalBodyText={state.errorHandler.errorMessage}
        okButtonText={"OK"}
        closeModal={() => dispatch(errorHandlerActions.closeErrorModal())}
      />
    </Container>
  );
}
