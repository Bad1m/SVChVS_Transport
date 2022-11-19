import React, { Component } from "react";
import Input from "../../UI/Inputs/Input";
import { Form, Button, FormGroup, Col, Container } from "react-bootstrap";
import { returnInputClientConfiguration } from "../../Utility/InputClientConfiguration";
import * as formUtilityActions from "../../Utility/ClientFormUtility";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";

export default class createClient extends Component {
  state = {
    clientForm: {},
    isFormValid: false,
  };

  componentWillMount = () => {
    this.setState({ clientForm: returnInputClientConfiguration() });
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

  createClient = (event) => {
    event.preventDefault();

    const ClientToCreate = {
      lastName: this.state.clientForm.lastName.value,
      firstName: this.state.clientForm.firstName.value,
      patronymic: this.state.clientForm.patronymic.value,
    };
    // const fetchData = async () => {
    //   let url = "/api/client";
    //   const response = await axios.get(url);
    //   setData(response.data);
    // };

    const url = "/api/client";
    this.props.onCreateClient(url, ClientToCreate, { ...this.props });
  };

  redirectToClientList = () => {
    const navigate = useNavigate();

    navigate("clients");
  };

  render() {
    const formElementsArray =
      formUtilityActions.convertStateToArrayOfFormObjects({
        ...this.state.clientForm,
      });
    return (
      <Container>
        <Form horizontal onSubmit={this.createClient}>
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
        <SuccessModal
          show={this.props.showSuccessModal}
          modalHeaderText={"Success message"}
          modalBodyText={"Action completed successfully"}
          okButtonText={"OK"}
          successClick={() =>
            this.props.onCloseSuccessModal("client-List", { ...this.props })
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
