import React, { useState } from "react";
import { Alert, Container, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";

const Unauthorized = ({ message, redirect }) => {
  const [show, setShow] = useState(true);
  const redirectFunc = () => {
    console.log("show: ", show);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };
  if (!show) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <Container>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <Alert variant="danger" as={Col} className="text-center">
            {message}
            {redirectFunc()}
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;
