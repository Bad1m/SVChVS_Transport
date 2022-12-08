import React, { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Button, FormGroup, Col, Container } from "react-bootstrap";
import { returnInputOrderConfiguration } from "../../Utility/InputOrderConfiguration";
import * as formUtilityActions from "../../Utility/OrderFormUtility";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";

export default function CreateOrder() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isFormValid, setFormValid] = useState(false);
  const [formElementsArray, setFormElementsArray] = useState([]);

  const [orderForm, setOrderForm] = useState({});

  useEffect(() => {
    const orderForm = returnInputOrderConfiguration();
    setOrderForm(orderForm);
    setFormElementsArray(
      formUtilityActions.convertStateToArrayOfFormObjects(orderForm)
    );
  }, []);

  const navigate = useNavigate();

  const handleChangeEvent = (event, id) => {
    const updatedOrderForm = orderForm;
    updatedOrderForm[id] =
      formUtilityActions.executeValidationAndReturnFormElement(
        event,
        updatedOrderForm,
        id
      );

    const counter = formUtilityActions.countInvalidElements(updatedOrderForm);

    setFormElementsArray(
      formUtilityActions.convertStateToArrayOfFormObjects(updatedOrderForm)
    );
    setOrderForm(updatedOrderForm);
    setFormValid(counter === 0);
  };

  const createOrder = (event) => {
    event.preventDefault();

    const OrderToCreate = {
      orderPrice: orderForm.orderPrice.value,
      orderData: orderForm.orderData.value,
      orderTime: orderForm.orderTime.value,
      client: orderForm.client.value,
      transport: orderForm.transport.value,
    };

    const url = "/api/order";
    const props = {
      showSuccessModal: state.repository.showSuccessModal,
      showErrorModal: state.errorHandler.showErrorModal,
      errorMessage: state.errorHandler.errorMessage,
    };
    dispatch(repositoryActions.postData(url, OrderToCreate, props));
  };

  const closeSuccessModal = () => {
    dispatch(repositoryActions.closeSuccessModal("order", { ...state }));
    navigate("/orders");
  };

  return (
    <Container>
      <Form onSubmit={createOrder}>
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
            <Button onClick={() => navigate("/orders")}>Отмена</Button>
          </Col>
        </FormGroup>
      </Form>

      <SuccessModal
        show={state.errorHandler.showErrorModa}
        modalHeaderText={"Error message"}
        modalBodyText={state.errorHandler.errorMessage}
        okButtonText={"OK"}
        closeModal={() => dispatch(errorHandlerActions.closeErrorModal())}
      />

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
