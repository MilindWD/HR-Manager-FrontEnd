//React imports
import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap imports
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";

//Components
import BackBTN from "./BackBTN";
import AlertMessage from "./AlertMessage";
import SuccessInfo from './SuccessInfo';

//actions
import UserAction from "../actions/User";



const LoginForm = () => {

  //Checking for user login
  const atStart = localStorage.getItem('userInfo');
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  //Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Action
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(UserAction.login(email, password));
  };

  //rendering

  //succesful login
  if(!atStart&&userInfo) {
    return <SuccessInfo message="Login successful 🙌"></SuccessInfo>
  }

  if (userInfo) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container>
        <Row className="py-3">
          <Col xs={{ span: 3, offset: 0 }}>
            <BackBTN></BackBTN>
          </Col>
          <Col xs={{ span: 6, offset: 0 }}>
            <h1 class="login-heading">Login</h1>
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Container className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </Container>
          ) : (
            <Col md={{ span: 4, offset: 4 }} className="my-5">
              <AlertMessage
                heading="Invalid Email/Password"
                message="Please check your email and password"
                visible={error}
              ></AlertMessage>

              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="my-2"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="my-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="my-2 block-button"
                  onClick={submitHandler}
                  
                >
                  Login
                </Button>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
};

export default LoginForm;
