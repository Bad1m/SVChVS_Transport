import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Modal, Button } from "react-bootstrap";
import "../ModalStyles.css";

export default function errorModal(props) {
  return (
    <Aux>
      <Modal show={props.show} backdrop="static">
        <Modal.Header>{props.modalHeaderText}</Modal.Header>
        <Modal.Body>{props.modalBodyText}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.closeModal}>{props.okButtonText}</Button>
        </Modal.Footer>
      </Modal>
    </Aux>
  );
}
