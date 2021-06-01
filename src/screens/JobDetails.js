//Basic React-Redux Imports
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Bootstrap/css imports
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Alert,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Modal,
} from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

//components
import BackBTN from "../components/BackBTN";
import FormInput from "../components/FormInput";
import InvoicePdf from "../components/InvoicePdf";
//others
import moment from "moment";
import axios from "axios";
import Unauthorized from "../components/Unauthorized";
import SuccessInfo from "../components/SuccessInfo";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { validateAddJob } from "../utils/formValidation";
import AlertMessage from "../components/AlertMessage";

const dateFormatter = (cell, row, rowIndex) => {
  return moment(cell).format("DD-MM-YYYY");
};

const columns = [
  {
    dataField: "invoiceId",
    text: "ID",
  },
  {
    dataField: "amount",
    text: "Amount",
  },
  {
    dataField: "date",
    text: "Date",
    formatter: dateFormatter,
  },
];

const rowClasses = "custom-row-class-jobs";

const JobDetails = ({ match }) => {
  //setting mode { 0:  add, 1: update, 2:  view}
  const mode =
    window.location.href.search("/add/") > 0
      ? 0
      : window.location.href.search("/update/") > 0
      ? 1
      : 2;

  //setting input feilds
  const empty = mode === 0;

  //redux functions
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //hooks
  const [empName, setEmpName] = useState("");
  const [jDate, setjDate] = useState("");
  const [cDate, setcDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [job, setJob] = useState("");
  const [authorization, setAuthorization] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userInfo.token}`,
          },
        };
        if (mode > 0) {
          const { data } = await axios.get(
            `https://hr-manager-hwhcs.herokuapp.com/api/jobs/${match.params.id}`,
            config
          );
          setJob(data);
          setEmpName(data.employee.name);
          setjDate(data.joiningDate);
          setcDate(data.closingDate);
          setPdfAddress(data.user.address);
          setPdfContact(data.user.contact);

        } else if (mode === 0) {
          const { data } = await axios.get(
            `https://hr-manager-hwhcs.herokuapp.com/api/employees/${match.params.id}`,
            config
          );
          setEmpName(data.name);
          setPdfAddress(data.user.address);
          setPdfContact(data.user.contact);
        }
        
        setLoading(false);
      } catch (error) {
        setAuthorization(false);
      }
    })();
  }, [setJob, match, mode, setEmpName, userInfo]);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setPdfAmount(row.amount);
      setPdfEmployee(empName);
      setPdfDate(moment(row.date).format("DD-MM-YYYY"));
      setPdfId(row.invoiceId);
      setShowModal(true);
    },
  };

  //Add job details
  const [redirect, setReload] = useState(null);
  const [error, setError] = useState(false);
  const [customerName, setcustomerName] = useState("");
  const [employee, setemployee] = useState(match.params.id);
  const [joiningDate, setjoiningDate] = useState(moment().format("DD-MM-YYYY"));
  const [fixedPayment, setfixedPayment] = useState(0);
  const [totalWorkDays, settotalWorkDays] = useState(0);
  const [advanceAmount, setadvanceAmount] = useState(0);
  const token = userInfo ? userInfo.token : "";
  const user = userInfo ? userInfo._id : "";

  const [fixedPaymentChange, setfixedPaymentChange] = useState(false);

  const [pdfAmount, setPdfAmount] = useState("");
  const [pdfEmployee, setPdfEmployee] = useState("");
  const [pdfDate, setPdfDate] = useState("");
  const [pdfId, setPdfId] = useState("");
  const [pdfAddress, setPdfAddress] = useState("");
  const [pdfContact, setPdfContact] = useState("");
  //body
  const addBody = {
    customerName,
    employee,
    joiningDate,
    fixedPayment: Number(fixedPayment),
    totalAmount: Number(advanceAmount),
    advanceAmount: Number(advanceAmount),
    balanceAmount: Number(fixedPayment) - Number(advanceAmount),
    payments: [],
    user,
  };

  //add submit handler
  const [loading, setLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [closeSuccess, setCloseSuccess] = useState(false);

  const addSubmitHandler = async (e) => {
    try {
      setLoading(true);
      validateAddJob(addBody);
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("https://hr-manager-hwhcs.herokuapp.com/api/jobs/assign", addBody, config);
      setLoading(false);
      if (data) {
        setAddSuccess(true);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const jobCloseHandler = async (e) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `https://hr-manager-hwhcs.herokuapp.com/api/jobs/close/${job._id}`,
        {},
        config
      );
      setLoading(false);
      if (data) {
        setCloseSuccess(true);
      }
    } catch (err) {
      setAuthorization(false);
    }
  };

  const fixedPaymentUpdateHandler = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `https://hr-manager-hwhcs.herokuapp.com/api/jobs/update/fixedpayment/${job._id}`,
        { fixedPayment },
        config
      );
      setfixedPaymentChange(false);
      setJob(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAuthorization(false);
    }
  };

  const modalClose = (e) => {
    setShowModal(false);
  };

  //render
  if (redirect||!authorization) {
    return <Unauthorized message="Unauthorized"></Unauthorized>;
  }

  if (!userInfo) {
    setReload("/");
  }

  if (addSuccess) {
    return <SuccessInfo message="Job added succesfully"></SuccessInfo>;
  }

  if (closeSuccess) {
    return <SuccessInfo message="Job closed succesfully"></SuccessInfo>;
  }

  if (showModal) {
    return (
      <Modal show={true} size="lg" onClose={modalClose}>
        <Modal.Body className="d-flex justify-content-center">
          <InvoicePdf
            employee={pdfEmployee}
            date={pdfDate}
            amount={pdfAmount}
            customer={customerName}
            closeHandler={modalClose}
            id={pdfId}
            address={pdfAddress}
            contact={pdfContact}
          >
            {" "}
          </InvoicePdf>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div>
      {/* heading and back button*/}
      <Row className="py-3">
        <Col xs={{ span: 3, offset: 0 }}>
          <BackBTN></BackBTN>
        </Col>

        <Col xs={{ span: 6, offset: 0 }}>
          <h2 className="text-center">
            {mode === 0 ? "Add Job" : mode === 1 ? "Make payment" : "View Job"}
          </h2>
          { job?(mode === 2 ? (
            job.closingDate ? (
              <Alert variant="success">Job Closed</Alert>
            ) : (
              <Alert variant="warning">Job is Open</Alert>
            )
          ) : (
            <div></div>
          )):<div></div>}
        </Col>
      </Row>

      {/* main details */}
      {loading ? (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Container>
              <AlertMessage visible={error} message={error}></AlertMessage>
              <Form>
                {/* customer name */}
                <FormInput
                  displayName="Customer Name"
                  initialValue={empty ? "" : job.customerName}
                  canEdit={mode < 2}
                  handler={setcustomerName}
                ></FormInput>

                {/* employee name */}
                <FormInput
                  displayName="Employee Name"
                  initialValue={empName}
                  canEdit={false}
                  handler={setemployee}
                ></FormInput>

                {/* joining date */}
                {mode === 2 ? (
                  <FormInput
                    displayName="Joining Date"
                    initialValue={empty ? "" : jDate}
                    canEdit={false}
                  ></FormInput>
                ) : (
                  <Form.Group as={Row}>
                    <Form.Label column xs="6" className="prim-blue">
                      Joining Date
                    </Form.Label>
                    <Col xs="6">
                      <Datetime
                        dateFormat="DD-MM-YYYY"
                        timeFormat={false}
                        onChange={(e) =>
                          setjoiningDate(moment(e).format("DD-MM-YYYY"))
                        }
                        initialValue={moment()}
                        inputProps={{ disabled: mode === 2 }}
                      />
                    </Col>
                  </Form.Group>
                )}

                {/* closing date */}
                {mode === 2 && job.closingDate ? (
                  <FormInput
                    displayName="Closing Date"
                    initialValue={empty ? "" : cDate}
                    canEdit={false}
                  ></FormInput>
                ) : (
                  <div></div>
                )}

                {/* Fixed payment */}
                <Form.Group as={Row}>
                  <Form.Label column xs="6" className="prim-blue">
                    {(mode === 2 && !job.closingDate)&&fixedPaymentChange ? (
                      <Button variant="warning" onClick={fixedPaymentUpdateHandler}>Update</Button>
                    ) : (
                      "Fixed Payment"
                    )}
                  </Form.Label>
                  <Col xs="6">
                    <Form.Control
                      readOnly={(job.closingDate||!(mode===2&&fixedPaymentChange))&&!(mode===0)}
                      defaultValue={empty ? "" : job.fixedPayment}
                      onChange={(e) => {
                        setfixedPayment(e.target.value);
                      }}
                      onClick={(e) => {
                        if(job&&!job.closingDate) {
                          setfixedPaymentChange(true);
                          
                        }
                        
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* advance amount */}
                <FormInput
                  displayName="Advance amount"
                  initialValue={empty ? "" : job.advanceAmount}
                  canEdit={mode < 2}
                  handler={setadvanceAmount}
                ></FormInput>

                {/*  amount  paid*/}
                {mode === 2 ? (
                  job.closingDate ? (
                    <div></div>
                  ) : (
                    <FormInput
                      displayName="Total amount paid"
                      initialValue={empty ? "" : job.totalAmount}
                      canEdit={false}
                    ></FormInput>
                  )
                ) : (
                  <div></div>
                )}

                {/* balance amount */}
                {mode === 2 ? (
                  job.closingDate ? (
                    <div></div>
                  ) : (
                    <FormInput
                      displayName="Balance amount"
                      initialValue={empty ? "" : job.balanceAmount}
                      canEdit={false}
                    ></FormInput>
                  )
                ) : (
                  <div></div>
                )}
              </Form>
              {mode === 0 ? (
                <Button
                  variant="primary"
                  className="my-3 block-button"
                  disabled={!(job.totalAmount === job.fixedPayment)}
                  onClick={addSubmitHandler}
                >
                  Add job
                </Button>
              ) : !job.closingDate ? (
                <div>
                  <Link to={`/payment/${job._id}`}>
                    <Button variant="primary" className="my-3">
                      Make a payment
                    </Button>
                  </Link>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      job.totalAmount === job.fixedPayment ? (
                        <div></div>
                      ) : (
                        <Tooltip>Please make full payment</Tooltip>
                      )
                    }
                  >
                    <Button
                      variant="danger"
                      className="m-3"
                      active={!(job.totalAmount === job.fixedPayment)}
                      onClick={
                        job.totalAmount === job.fixedPayment && jobCloseHandler
                      }
                    >
                      Close Job
                    </Button>
                  </OverlayTrigger>
                </div>
              ) : (
                <div></div>
              )}
              <br></br>
              {job ? (
                <BootstrapTable
                  className="my-3"
                  headerWrapperClasses="table-head"
                  keyField="id"
                  data={job.payments}
                  columns={columns}
                  rowClasses={rowClasses}
                  rowEvents={rowEvents}
                />
              ) : (
                <div></div>
              )}
            </Container>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default JobDetails;
