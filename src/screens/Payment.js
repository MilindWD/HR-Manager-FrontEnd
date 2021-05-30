import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import AlertMessage from "../components/AlertMessage";
import BackBTN from "../components/BackBTN";
import FormInput from "../components/FormInput";
import SuccessInfo from "../components/SuccessInfo";
import Unauthorized from "../components/Unauthorized";

const Payment = ({ match }) => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const [job, setJob] = useState("");
  const [empName, setEmpName] = useState("");
  const [payment, setPayment] = useState(0);
  const [comment, setComment] = useState("");
  const [redirect, setRedirect] = useState("");

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authorization, setAuthorization] = useState(true); 

  useEffect(() => {
    (async function fetchData() {
      try {
        setLoading(true);
        const config = {
          headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${userInfo.token}`
          }
        }
        const { data } = await axios.get(
          `https://hr-manager-hwhcs.herokuapp.com/api/jobs/${match.params.id}`, config
        );
        console.log(data);
        setJob(data);
        setEmpName(data.employee.name);
        setLoading(false);
      } catch (error) {
        setAuthorization(false);
      }
      
    })();
  }, [match, userInfo]);

  const paymentBody = {
    amount: Number(payment),
    comments: comment,
    date: moment(),
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${userInfo.token}`
        }
      }
      const job = await axios.post(
        `https://hr-manager-hwhcs.herokuapp.com/api/jobs/payment/${match.params.id}`,
        paymentBody, config
      );
      setLoading(false);
      if (job) {
        setRedirect(`/view/job/${match.params.id}`);
      }
    } catch (error) {
      setAuthorization(false);
    }
    
  };

  if(!authorization) {
    <Unauthorized message="Unauthorized"></Unauthorized>
  }

  if (redirect) {
    return (
      <SuccessInfo
        message="Payment successful"
        redirect={redirect}
      ></SuccessInfo>
    );
  }

  return (
    <Container>
      <Row className="py-3">
        <Col xs={{ span: 3, offset: 0 }}>
          <BackBTN></BackBTN>
        </Col>

        <Col xs={{ span: 6, offset: 0 }}>
          <h2 className="text-center">Payment</h2>
        </Col>
      </Row>
      {loading ? (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : <div><Row>
      <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
        <AlertMessage
          visible={true}
          message={`Balance amount: ${job.balanceAmount}`}
        ></AlertMessage>
      </Col>
    </Row>
    <Row>
      <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
        <Container>
          <FormInput
            displayName="Customer Name"
            initialValue={job.customerName}
            canEdit={false}
          ></FormInput>
          <FormInput
            displayName="Employee Name"
            initialValue={empName}
            canEdit={false}
          ></FormInput>
          <FormInput
            displayName="Payment Amount"
            canEdit={true}
            handler={setPayment}
          ></FormInput>
          <FormInput
            displayName="Comments"
            canEdit={true}
            handler={setComment}
          ></FormInput>
          <Button
            variant="primary"
            disabled={showModal}
            className="btn-block my-3"
            onClick={(e) => setShowModal(true)}
          >
            Make Payment
          </Button>
        </Container>
      </Col>
    </Row></div>
      
  }
      {showModal ? (
        <Modal.Dialog>
          <Modal.Body>
            <Alert variant="warning" className="my-1">
              {`Paying Amount : `}
              <strong>{payment}</strong>
            </Alert>
            <Alert variant="success" className="my-1">
              {`Balance after Payment: `}
              <strong>{job.balanceAmount - Number(payment)}</strong>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={async () => {
                await handleConfirm();
                setShowModal(false);
              }}
            >
              Confirm
            </Button>
            <Button variant="danger" onClick={(e) => setShowModal(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default Payment;
