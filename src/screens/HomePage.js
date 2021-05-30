//Basic React Components
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Importing Components
import MainPageFiller from "../components/MainPageFiller";

//rendering
const HomePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <MainPageFiller username={userInfo ? userInfo.name : undefined} />
      <Container className="text-center my-5">
        {userInfo ? (
          <>
            <Row>
              <Col lg={{span: 2, offset: 5}} md={{ span: 4, offset: 4 }} xs={{span: 6, offset: 3}}>
                <Link to="/view/employees">
                  <Button variant="primary" className="my-2 home-button">
                   View Employees
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={{span: 2, offset: 5}} md={{ span: 4, offset: 4 }} xs={{span: 6, offset:3}}>
                <Link to="/add/employee">
                  <Button variant="primary" className="my-2 home-button">
                    Add Employee
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={{span: 2, offset: 5}} md={{ span: 4, offset: 4 }} xs={{span: 6, offset: 3}}>
                <Link to="/view/jobs">
                  <Button variant="primary" className="my-2 home-button">
                   View All Jobs
                  </Button>
                </Link>
              </Col>
            </Row>
            
          </>
        ) : (
          <div></div>
        )}
        <br></br>
      </Container>
    </div>
  );
};

export default HomePage;
