import React from "react";
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
        <td>{props.client.number}</td>
        <td>{props.client.price}</td>
        <td>
          <Button
            className=""
            onClick={() =>
              redirectToUpdateClient(props.client.id, props.history)
            }
          >
            Обновить
          </Button>
        </td>
        <td>
          <Button
            onClick={() =>
              rediterctToDeleteClient(props.client.id, props.history)
            }
          >
            Удалить
          </Button>
        </td>
      </tr>
    </Aux>
  );
}
