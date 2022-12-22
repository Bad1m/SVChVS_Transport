import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import {
  Container,
  FormGroup,
  Col,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import "./Input.css";

export default function input(props) {
  let inputField = null;
  let errorMessage = null;

  if (props.invalid && props.shouldValidate && props.touched) {
    errorMessage = <em>{props.errorMessage}</em>;
  }

  switch (props.elementType) {
    case "input":
      inputField = (
        <FormGroup controlId={props.id}>
          <Col componentclass={FormLabel} sm={2}>
            {props.label}
          </Col>
          <Container className="input">
            <Col sm={6}>
              <FormControl
                type={props.type}
                value={props.value}
                onChange={props.changed}
                onBlur={props.blur}
              />
            </Col>
          </Container>
          <Col>
            <em>{errorMessage}</em>
          </Col>
        </FormGroup>
      );
      break;
    default:
      inputField = null;
  }

  return <Aux>{inputField}</Aux>;
}
