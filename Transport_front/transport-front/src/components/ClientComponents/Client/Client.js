import React, { useEffect } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Client(props) {
  const navigate = useNavigate();
  const redirectToUpdateClient = (id) => {
    navigate("/updateClient/" + id);
  };

  const rediterctToDeleteClient = (id) => {
    navigate("/deleteClient/" + id);
  };

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
