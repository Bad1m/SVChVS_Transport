import React, { Component, useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "react-aux";
import Client from "../../components/ClientComponents/Client/Client";
import axios from "../../axios/axios";

export default function ClientList() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/client";
      const response = await axios.get(url);
      setData(response.data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Aux>
      <Row>
        <Col md={2}>
          <Link to="/createClient">Добавить клиента</Link>
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
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Отчество</th>
                  <th>Обновить</th>
                  <th>Удалить</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element) => {
                  return <Client key={element.id} client={element} />;
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
