//React Imports
import React from "react";

//Bootstrap imports
import { Jumbotron, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; //

const MainPageFiller = (props) => {
  return (
    <Container className="align-items-center">
      <Jumbotron className="main-page-filler">
      <h5 className="my-2" style={{color: '#3459e6', fontWeight: '800'}}>Health and Wellness Health Care Services, Mysuru</h5>
        <h1>Welcome {props.username ? props.username : "to HR Manager"} </h1>
        {!props.username ? (
          <div>
            <p>Please Login to continue</p>
            <p>
              <Row>
                <Col xs={{ span: 10, offset: 1 }} md={{ span: 4, offset: 4 }}>
                  <Link to="/login">
                    <Button
                      variant="primary"
                      size="lg"
                      className="block-button"
                    >
                      Login
                    </Button>
                  </Link>
                </Col>
              </Row>
            </p>
          </div>
        ) : (
          ""
        )}
      </Jumbotron>
    </Container>
  );
};

export default MainPageFiller;
