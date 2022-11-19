import React from "react";
import "./Footer.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function Footer() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Nav className="footer">
          <Image src="public/bustransport_bus.jpg" />
          <Nav.Link href="#home">Главная</Nav.Link>
          <Nav.Link href="#clients">О нас</Nav.Link>
          <Nav.Link href="#transport">Транспорт</Nav.Link>
          <Row>
            <p className="text">Контакты</p>
            <p className="text">+375441111111</p>
          </Row>
        </Nav>
      </Container>
    </Navbar>
  );
}
