import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./Home.css";

export default function HomePage() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Container className="home-text">
            Учет транспорта и клиентов
          </Container>
        </Col>
      </Row>
      <img
        src="public/bus-parked-on-the-road.jpg"
        className="img-transport"
        alt="transport"
      />
      <Row>
        <Col md={12}>
          <Container className="home-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
