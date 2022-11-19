import React from "react";
import "./Navigation.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container, Row, Col } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Nav className="nav">
          <Nav.Link href="home">Главная</Nav.Link>
          <Nav.Link href="clients">Клиенты</Nav.Link>
          <Nav.Link href="transport">Транспорт</Nav.Link>
          <Nav.Link href="orders">Заказы</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
