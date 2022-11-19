import React, { Component, useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "react-aux";
import Order from "../../components/OrderComponents/Order/Order.js";
import axios from "../../axios/axios";

export default function OrderList() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/order";
      const response = await axios.get(url);
      setData(response.data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Aux>
      <Row>
        <Col md={2}>
          <Link to="/createOrder">Добавить заказ</Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={12}>
          {data && data.length > 0 ? (
            <Table responsive striped>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Цена</th>
                  <th>Дата</th>
                  <th>Время</th>
                  <th>Клиент</th>
                  <th>Транспорт</th>
                  <th>Обновить</th>
                  <th>Удалить</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element) => {
                  return <Order key={element.id} order={element} />;
                })}
              </tbody>
            </Table>
          ) : (
            <div>Загрузка...</div>
          )}
        </Col>
      </Row>
    </Aux>
  );
}
