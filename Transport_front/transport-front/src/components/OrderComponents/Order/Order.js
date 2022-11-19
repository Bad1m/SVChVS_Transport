import React, { useEffect } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Button } from "react-bootstrap";

const redirectToUpdateOrder = (id, history) => {
  history.push("/updateOrder/" + id);
};

const rediterctToDeleteOrder = (id, history) => {
  history.push("/deleteOrder/" + id);
};

export default function Order(props) {
  return (
    <Aux>
      <tr>
        <td>{props.order.id}</td>
        <td>{props.order.orderPrice}</td>
        <td>{props.order.orderData}</td>
        <td>{props.order.orderTime}</td>
        <td>{props.order.client}</td>
        <td>{props.order.transport}</td>
        <td>
          <Button
            onClick={() => redirectToUpdateOrder(props.order.id, props.history)}
          >
            Update
          </Button>
        </td>
        <td>
          <Button
            onClick={() =>
              rediterctToDeleteOrder(props.order.id, props.history)
            }
          >
            Delete
          </Button>
        </td>
      </tr>
    </Aux>
  );
}
