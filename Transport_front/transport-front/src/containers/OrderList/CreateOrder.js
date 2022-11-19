import React, { Component } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Well, Button, FormGroup, Col, Container } from "react-bootstrap";
import { returnInputOrderConfiguration } from "../../Utility/InputOrderConfiguration";
import * as formUtilityActions from "../../Utility/OrderFormUtility";

export default class createOrder extends Component {
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
            <Col mdOffset={6} md={1}>
              <Button type="submit" disabled={!this.state.isFormValid}>
                Создать
              </Button>
            </Col>
            <Col md={1}>
              <Button onClick={this.redirectToClientList}>Отмена</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
