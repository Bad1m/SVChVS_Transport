import React, { useEffect } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Button } from "react-bootstrap";

const redirectToUpdateClient = (id, history) => {
  history.push("/updateClient/" + id);
};

const rediterctToDeleteClient = (id, history) => {
  history.push("/deleteClient/" + id);
};

export default function Client(props) {
  return (
    <Aux>
      <tr>
        <td>{props.client.id}</td>
        <td>{props.client.lastName}</td>
        <td>{props.client.firstName}</td>
        <td>{props.client.patronymic}</td>
        <td>
          <Button
            onClick={() =>
              redirectToUpdateClient(props.client.id, props.history)
            }
          >
            Update
          </Button>
        </td>
        <td>
          <Button
            onClick={() =>
              rediterctToDeleteClient(props.client.id, props.history)
            }
          >
            Delete
          </Button>
        </td>
      </tr>
    </Aux>
  );
}
