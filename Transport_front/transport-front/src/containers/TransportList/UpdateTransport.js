import React, { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Button, FormGroup, Col, Container, Row } from "react-bootstrap";
import { returnInputTransportConfiguration } from "../../Utility/InputTransportConfiguration";
import * as formUtilityActions from "../../Utility/TransportFormUtility";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";

export default function UpdateTransport() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.repository);
  const state = useSelector((state) => state);
  const { showSuccessModal } = useSelector((state) => state.repository);
  const { showErrorModal } = useSelector((state) => state.errorHandler);
  const { errorMessage } = useSelector((state) => state.errorHandler);

  const [isFormValid, setFormValid] = useState(false);
  const [formElementsArray, setFormElementsArray] = useState([]);
  const [transportForm, setTransportForm] = useState({});
  const navigate = useNavigate();
  //const [id, client] = useState({});

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
      transportForm.number.valid = true;

      transportForm.type.value = data.type;
      transportForm.type.valid = true;

      transportForm.capacity.value = data.capacity;
      transportForm.capacity.valid = true;

      transportForm.weight.value = data.weight;
      transportForm.weight.valid = true;

      transportForm.speed.value = data.speed;
      transportForm.speed.valid = true;

      transportForm.technicalСondition.value = data.technicalСondition;
      transportForm.technicalСondition.valid = true;

      setTransportForm(transportForm);
      setFormElementsArray(
        formUtilityActions.convertStateToArrayOfFormObjects(transportForm)
      );

      setFormValid(true);
    }
  }, [data]);

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

  const updateTransport = (event) => {
    event.preventDefault();
    console.log(transportForm);

    const transportToUpdate = {
      number: transportForm.number.value,
      type: transportForm.type.value,
      capacity: transportForm.capacity.value,
      weight: transportForm.weight.value,
      speed: transportForm.speed.value,
      technicalСondition: transportForm.technicalСondition.value,
    };

    const url = "/api/transport/" + id;
    const props = {
      showSuccessModal: showSuccessModal,
      showErrorModal: showErrorModal,
      errorMessage: errorMessage,
    };
    dispatch(repositoryActions.putData(url, transportToUpdate, props));
  };

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("transport", { ...state }));
    navigate("/transport");
  };

  return (
    <Container>
      <Form onSubmit={updateTransport}>
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
            <Button type="submit" disabled={!isFormValid}>
              Обновить
            </Button>
            <Button onClick={() => navigate("/transport")}>Отмена</Button>
          </Row>
        </FormGroup>
      </Form>
      <SuccessModal
        show={showSuccessModal}
        modalHeaderText={"Сообщение"}
        modalBodyText={"Успешно обновлено"}
        okButtonText={"OK"}
        successClick={closeSuccessModal}
      />

      <ErrorModal
        show={showErrorModal}
        modalHeaderText={"Сообщение об ошибке"}
        modalBodyText={errorMessage}
        okButtonText={"OK"}
        closeModal={() => dispatch(errorHandlerActions.closeErrorModal())}
      />
    </Container>
  );
}
