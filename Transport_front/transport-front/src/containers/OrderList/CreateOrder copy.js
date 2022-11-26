import React, { Component } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Well, Button, FormGroup, Col, Container } from "react-bootstrap";
import { returnInputOrderConfiguration } from "../../Utility/InputOrderConfiguration";
import * as formUtilityActions from "../../Utility/OrderFormUtility";
import { connect } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";

class createOrder extends Component {
  state = {
    orderForm: {},
    isFormValid: false,
  };

  componentWillMount = () => {
    this.setState({ orderForm: returnInputOrderConfiguration() });
  };

  handleChangeEvent = (event, id) => {
    const updatedOrderForm = { ...this.state.orderForm };
    updatedOrderForm[id] =
      formUtilityActions.executeValidationAndReturnFormElement(
        event,
        updatedOrderForm,
        id
      );

    const counter = formUtilityActions.countInvalidElements(updatedOrderForm);

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: counter === 0,
    });
  };

  createOrder = (event) => {
    event.preventDefault();

    const OrderToCreate = {
      orderPrice: this.state.orderForm.orderPrice.value,
      orderData: this.state.orderForm.orderData.value,
      orderTime: this.state.orderForm.orderTime.value,
      client: this.state.orderForm.client.value,
      transport: this.state.orderForm.transport.value,
    };
    const url = "/api/order";
    this.props.onCreateOrder(url, OrderToCreate, { ...this.props });
  };

  redirectTotOrderList = () => {
    this.props.history.push("order");
  };

  render() {
    const formElementsArray =
      formUtilityActions.convertStateToArrayOfFormObjects({
        ...this.state.orderForm,
      });
    return (
      <Container>
        <Form horizontal onSubmit={this.createOrder}>
          {formElementsArray.map((element) => {
            return (
              <Input
                key={element.id}
                elementType={element.config.element}
                id={element.id}
                label={element.config.label}
                type={element.config.type}
                value={element.config.value}
                changed={(event) => this.handleChangeEvent(event, element.id)}
                errorMessage={element.config.errorMessage}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                blur={(event) => this.handleChangeEvent(event, element.id)}
              />
            );
          })}
          <br />
          <FormGroup>
            <Col mdoffset={6} md={1}>
              <Button type="submit" disabled={!this.state.isFormValid}>
                Создать
              </Button>
            </Col>
            <Col md={1}>
              <Button onClick={this.redirectToClientList}>Отмена</Button>
            </Col>
          </FormGroup>
        </Form>
        <SuccessModal
          show={this.props.showSuccessModal}
          modalHeaderText={"Success message"}
          modalBodyText={"Action completed successfully"}
          okButtonText={"OK"}
          successClick={() =>
            this.props.onCloseSuccessModal("orders", { ...this.props })
          }
        />
        <ErrorModal
          show={this.props.showErrorModal}
          modalHeaderText={"Error message"}
          modalBodyText={this.props.errorMessage}
          okButtonText={"OK"}
          closeModal={() => this.props.onCloseErrorModal()}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showSuccessModal: state.repository.showSuccessModal,
    showErrorModal: state.errorHandler.showErrorModal,
    errorMessage: state.errorHandler.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateOrder: (url, order, props) =>
      dispatch(repositoryActions.postData(url, order, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createOrder);
