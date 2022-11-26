import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./Home.css";
// import transportImage from "/transport-front/public/transport.jpg";

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
      {/* <img src={transportImage} className="img-transport" alt="transport" /> */}
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
