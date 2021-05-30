import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UserAction from '../actions/User';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = (e) => {
    dispatch(UserAction.logout())
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>HR Manager</Navbar.Brand>
        </LinkContainer>
        <Nav inline>
        {console.log(userLogin)}
          {userInfo ? (
            <Button variant="danger" onClick={logoutHandler}>Logout</Button>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                <i class="fas fa-sign-in-alt"></i>Login
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
