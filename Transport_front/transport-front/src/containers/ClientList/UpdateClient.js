import React, { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Button, FormGroup, Col, Container } from "react-bootstrap";
import { returnInputClientConfiguration } from "../../Utility/InputClientConfiguration";
import * as formUtilityActions from "../../Utility/ClientFormUtility";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";

export default function CreateClient() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isFormValid, setFormValid] = useState(false);
  const [formElementsArray, setFormElementsArray] = useState([]);
  const [clientForm, updatedClientForm] = useState({});
  const [id, client] = useState({});

  useEffect(() => {
    const id = state.match.params.id;
    const url = "/api/client/" + id;
    state.onGetClientById(url, { client });

    const clientForm = returnInputClientConfiguration();
    // setClientForm(clientForm);
    setFormElementsArray(
      formUtilityActions.convertStateToArrayOfFormObjects(clientForm)
    );

    // const updatedOwnerForm = { ...state.clientForm };
    // let lastName = { ...updatedOwnerForm.lastName };
    // let firstName = { ...updatedOwnerForm.firstName };
    // let patronymic = { ...updatedOwnerForm.patronymic };

    // // lastName.value = nextProps.data.lastName;
    // lastName.value = state.data.lastName;
    // lastName.valid = true;

    // firstName.value = state.data.firstName;
    // firstName.valid = true;

    // patronymic.value = state.data.patronymic;
    // patronymic.valid = true;

    // updatedClientForm["lastName"] = lastName;
    // updatedClientForm["firstName"] = firstName;
    // updatedClientForm["patronymic"] = patronymic;
    this.setState({ clientForm: updatedClientForm });
  }, []);

  const navigate = useNavigate();

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
    // setClientForm(updatedClientForm);
    setFormValid(counter === 0);
  };

  const updateClient = (event) => {
    event.preventDefault();

    const ClientToUpdate = {
      lastName: clientForm.lastName.value,
      firstName: clientForm.firstName.value,
      patronymic: clientForm.patronymic.value,
    };

    const url = "/api/client" + state.data.id;
    const props = {
      showSuccessModal: state.repository.showSuccessModal,
      showErrorModal: state.errorHandler.showErrorModal,
      errorMessage: state.errorHandler.errorMessage,
    };
    dispatch(repositoryActions.putData(url, ClientToUpdate, props));
  };

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("client", { ...state }));
    navigate("/clients");
  };

  return (
    <Container>
      <Form horizontal onSubmit={updateClient}>
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
          <Col mdoffset={6} md={1}>
            <Button type="submit" disabled={!isFormValid}>
              Создать
            </Button>
          </Col>
          <Col md={1}>
            <Button onClick={() => navigate("/clients")}>Отмена</Button>
          </Col>
        </FormGroup>
      </Form>
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
    </Container>
  );
}
