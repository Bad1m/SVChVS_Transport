import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

export default function Layout(props) {
  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <main>{props.children}</main>
      <Footer />
    </Container>
  );
}
