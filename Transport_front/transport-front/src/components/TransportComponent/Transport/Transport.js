import React, { useEffect } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Button } from "react-bootstrap";

const redirectToUpdateTransport = (id, history) => {
  history.push("/updateTransport/" + id);
};

const rediterctToDeleteTransport = (id, history) => {
  history.push("/deleteTransport/" + id);
};

export default function Transport(props) {
  return (
    <Aux>
      <tr>
        <td>{props.transport.id}</td>
        <td>{props.transport.number}</td>
        <td>{props.transport.type}</td>
        <td>{props.transport.capacity}</td>
        <td>{props.transport.weight}</td>
        <td>{props.transport.speed}</td>
        <td>{props.transport.technicalСondition}</td>
        <td>
          <Button
            onClick={() =>
              redirectToUpdateTransport(props.client.id, props.history)
            }
          >
            Update
          </Button>
        </td>
        <td>
          <Button
            onClick={() =>
              rediterctToDeleteTransport(props.client.id, props.history)
            }
          >
            Delete
          </Button>
        </td>
      </tr>
    </Aux>
  );
}
