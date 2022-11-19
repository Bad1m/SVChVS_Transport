import React, { Component, useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "react-aux";
import Transport from "../../components/TransportComponent/Transport/Transport";
import axios from "../../axios/axios";

export default function TransportList() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/transport";
      const response = await axios.get(url);
      setData(response.data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Aux>
      <Row>
        <Col md={2}>
          <Link to="/createTransport">Добавить транспорт</Link>
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
                  <th>Номер</th>
                  <th>Тип</th>
                  <th>Вместимость</th>
                  <th>Вес</th>
                  <th>Скорость</th>
                  <th>Техн. состояние</th>
                  <th>Обновить</th>
                  <th>Удалить</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element) => {
                  return <Transport key={element.id} transport={element} />;
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
