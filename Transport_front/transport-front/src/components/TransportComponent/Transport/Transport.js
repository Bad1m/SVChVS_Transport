import React, { useEffect } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Transport(props) {

  const navigate = useNavigate();
  const redirectToUpdateTransport = (id) => {
    navigate("/updateTransport/" + id);
  };

  const rediterctToDeleteTransport = (id) => {
    navigate("/deleteTransport/" + id);
  };
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
              redirectToUpdateTransport(props.transport.id, props.history)
            }
          >
            Обновить
          </Button>
        </td>
        <td>
          <Button
            onClick={() =>
              rediterctToDeleteTransport(props.transport.id, props.history)
            }
          >
            Удалить
          </Button>
        </td>
      </tr>
    </Aux>
  );
}
