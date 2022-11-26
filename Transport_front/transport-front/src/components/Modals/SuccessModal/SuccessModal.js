import React, { useEffect } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Modal, Button } from "react-bootstrap";
import "../ModalStyles.css";

export default function SuccessModal(props) {
  useEffect(() => {
    console.log("SuccessModal: ", props);
  });

  return (
    <Aux>
      <Modal style={{ opacity: 1 }} show={props.show} backdrop="static">
        <Modal.Header>{props.modalHeaderText}</Modal.Header>
        <Modal.Body>
          <p>{props.modalBodyText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.successClick}>{props.okButtonText}</Button>
        </Modal.Footer>
      </Modal>
    </Aux>
  );
}
