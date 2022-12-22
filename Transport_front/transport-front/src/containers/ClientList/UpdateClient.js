import React, { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Button, FormGroup, Col, Container, Row } from "react-bootstrap";
import { returnInputClientConfiguration } from "../../Utility/InputClientConfiguration";
import * as formUtilityActions from "../../Utility/ClientFormUtility";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";

export default function UpdateClient() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.repository);
  const state = useSelector((state) => state);
  const { showSuccessModal } = useSelector((state) => state.repository);
  const { showErrorModal } = useSelector((state) => state.errorHandler);
  const { errorMessage } = useSelector((state) => state.errorHandler);

  const [isFormValid, setFormValid] = useState(false);
  const [formElementsArray, setFormElementsArray] = useState([]);
  const [clientForm, setClientForm] = useState({});
  const navigate = useNavigate();

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
      clientForm.lastName.valid = true;

      clientForm.firstName.value = data.firstName;
      clientForm.firstName.valid = true;

      clientForm.patronymic.value = data.patronymic;
      clientForm.patronymic.valid = true;

      clientForm.number.value = data.number;
      clientForm.number.valid = true;

      clientForm.price.value = data.price;
      clientForm.price.valid = true;

      setClientForm(clientForm);
      setFormElementsArray(
        formUtilityActions.convertStateToArrayOfFormObjects(clientForm)
      );

      setFormValid(true);
    }
  }, [data]);

  const handleChangeEvent = (event, id) => {
    const updatedClientForm = clientForm;
    updatedClientForm[id] =
      formUtilityActions.executeValidationAndReturnFormElement(
        event,
        updatedClientForm,
        id
      );

    const counter = formUtilityActions.countInvalidElements(updatedClientForm);

    setFormElementsArray(
      formUtilityActions.convertStateToArrayOfFormObjects(updatedClientForm)
    );
    setClientForm(updatedClientForm);
    setFormValid(counter === 0);
  };

  const updateClient = (event) => {
    event.preventDefault();

    const clientToUpdate = {
      lastName: clientForm.lastName.value,
      firstName: clientForm.firstName.value,
      patronymic: clientForm.patronymic.value,
      number: clientForm.number.value,
      price: clientForm.price.value,
    };

    const url = "/api/client/" + id;
    const props = {
      showSuccessModal: showSuccessModal,
      showErrorModal: showErrorModal,
      errorMessage: errorMessage,
    };
    dispatch(repositoryActions.putData(url, clientToUpdate, props));
  };

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("client", { ...state }));
    navigate("/clients");
  };

  return (
    <Container>
      <Form onSubmit={updateClient}>
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
            <Button onClick={() => navigate("/clients")}>Отмена</Button>
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
