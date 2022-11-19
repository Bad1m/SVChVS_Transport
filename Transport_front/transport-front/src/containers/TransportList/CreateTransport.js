import React, { Component } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Well, Button, FormGroup, Col, Container } from "react-bootstrap";
import { returnInputTransportConfiguration } from "../../Utility/InputTransportConfiguration";
import * as formUtilityActions from "../../Utility/TransportFormUtility";

export default class createTransport extends Component {
  state = {
    transportForm: {},
    isFormValid: false,
  };

  componentWillMount = () => {
    this.setState({ transportForm: returnInputTransportConfiguration() });
  };

  handleChangeEvent = (event, id) => {
    const updatedTransportForm = { ...this.state.transportForm };
    updatedTransportForm[id] =
      formUtilityActions.executeValidationAndReturnFormElement(
        event,
        updatedTransportForm,
        id
      );

    const counter =
      formUtilityActions.countInvalidElements(updatedTransportForm);

    this.setState({
      clientForm: updatedTransportForm,
      isFormValid: counter === 0,
    });
  };

  render() {
    const formElementsArray =
      formUtilityActions.convertStateToArrayOfFormObjects({
        ...this.state.transportForm,
      });
    return (
      <Container>
        <Form horizontal onSubmit={this.createTransport}>
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
