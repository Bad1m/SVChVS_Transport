import React, { useEffect, useState } from "react";
import { Component } from "react";
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

class UpdateClient extends Component {
  state = {
    clientForm: {},
    isFormValid: true,
  };

  componentWillMount = () => {
    this.setState({ clientForm: returnInputClientConfiguration() });
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    const url = "/api/client/" + id;
    this.props.onGetClientById(url, { ...this.props });
  };

  componentWillReceiveProps = (nextProps) => {
    const updatedClientForm = { ...this.state.ownerForm };
    let lastName = { ...updatedClientForm.lastName };
    let firstName = { ...updatedClientForm.firstName };
    let patronymic = { ...updatedClientForm.patronymic };

    lastName.value = nextProps.data.lastName;
    lastName.valid = true;

    firstName.value = nextProps.data.firstName;
    firstName.valid = true;

    patronymic.value = nextProps.data.patronymic;
    patronymic.valid = true;

    updatedClientForm["lastName"] = lastName;
    updatedClientForm["firstName"] = firstName;
    updatedClientForm["patronymic"] = patronymic;
    this.setState({ ownerForm: updatedClientForm });
  };

  handleChangeEvent = (event, id) => {
    const updatedClientForm = { ...this.state.clientForm };
    updatedClientForm[id] =
      formUtilityActions.executeValidationAndReturnFormElement(
        event,
        updatedClientForm,
        id
      );

    const counter = formUtilityActions.countInvalidElements(updatedClientForm);

    this.setState({
      clientForm: updatedClientForm,
      isFormValid: counter === 0,
    });
  };

  render() {
    const formElementsArray =
      formUtilityActions.convertStateToArrayOfFormObjects({
        ...this.state.clientForm,
      });
    return (
      <Container>
        <Form horizontal onSubmit={this.updateClient}>
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
                Update
              </Button>
            </Col>
            <Col md={1}>
              <Button onClick={this.redirectToOwnerList}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default UpdateClient;
