//Basic React-Redux Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap/css imports
import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

//components
import BackBTN from "../components/BackBTN";
import FormInput from "../components/FormInput";

//actions
import employeeActionAll from "../actions/Employee";

//others
import moment from "moment";
import axios from "axios";
import Unauthorized from "../components/Unauthorized";
import { Link } from "react-router-dom";
import {validateAddEmployee} from '../utils/formValidation';
import AlertMessage from "../components/AlertMessage";
import SuccessInfo from "../components/SuccessInfo";

const EmployeeDetails = ({ match }) => {
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
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //hooks
  const [employee, setEmployee] = useState("");
  const [authorization, setAuthorization] = useState(true);
  useEffect(() => {
    (async function fetchData() {
      try {
        setLoading(true);
        if (mode > 0) {
          const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${userInfo.token}`
            }
        }
          const { data } = await axios.get(`https://hr-manager-hwhcs.herokuapp.com/api/employees/${match.params.id}`, config);
          setEmployee(data);
          
        }
        setLoading(false);
      } catch (error) {
        setAuthorization(false);
        setLoading(false);
      }
      
    })()
  }, [setEmployee, match, mode, userInfo]);


  //Add employee details
  const [error, setError] = useState(false);
  const [redirect, setReload] = useState(null);
  const [name, setName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [husbandName, sethusbandName] = useState("");
  const [address, setaddress] = useState("");
  const [mobile, setmobile] = useState("");
  const [dob, setdob] = useState("");
  const [age, setage] = useState("");
  const [sex, setsex] = useState("Male");
  const [isMarried, setisMarried] = useState("Not Married");
  const [caste, setcaste] = useState("");
  const [languages, setlanguages] = useState("");
  const [education, seteducation] = useState("");
  const [workExperience, setworkExperience] = useState('0');
  const user = userInfo?userInfo._id:"";
  const token = userInfo?userInfo.token:"";
  const [loading, setLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false)
  //body
  const addBody = {
    name,
    fatherName,
    husbandName,
    address,
    mobile,
    dob,
    age,
    sex,
    isMarried,
    caste,
    languages,
    education,
    workExperience,
    user,
    token,
  };

  //add submit handler
  const addSubmitHandler = (e) => {
    try {
      setLoading(true);
      validateAddEmployee(addBody);
      dispatch(employeeActionAll.employeeAdd(addBody)).then(() => {
        setAddSuccess(true);
        setLoading(false);
      });
      
    } catch(err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
    
  };

  //render
  if(addSuccess) {
    return <SuccessInfo message="Employee added successfully"></SuccessInfo>
  }

  if (redirect||!authorization) {
    return <Unauthorized message="Unauthorized"></Unauthorized>
  }

  if(!userInfo) {
    setReload('/');
  }

  return (
    <>
      {/* heading and back button*/}
      <Row className="py-3">
        <Col xs={{ span: 3, offset: 0 }}>
          <BackBTN></BackBTN>
        </Col>

        <Col xs={{ span: 6, offset: 0 }}>
          <h2 className="text-center">
            {mode === 0
              ? "Add Employee"
              : mode === 1
              ? "Update Employee"
              : "Employee Details"}
          </h2>
        </Col>
      </Row>

      {/* main details */}
      <Row>
        <Col sm={{ span: 8, offset: 2 }} lg={{span: 6, offset: 3}}>
        {loading ? (
          <Container className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        ) :
          <Container>
          <AlertMessage visible={error} message={error}></AlertMessage>
            <Form>
              {/* name */}
              <FormInput
                displayName="Name"
                initialValue={empty ? "" : employee.name}
                canEdit={mode < 2}
                handler={setName}
              ></FormInput>

              {/* father's name */}
              <FormInput
                displayName="Father's Name"
                initialValue={empty ? "" : employee.fatherName}
                canEdit={mode < 2}
                handler={setfatherName}
              ></FormInput>

              {/* husband's name */}
              <FormInput
                displayName="Husband's Name"
                initialValue={empty ? "" : employee.husbandName}
                canEdit={mode < 2}
                handler={sethusbandName}
              ></FormInput>

              {/* address */}
              <FormInput
                displayName="Address"
                initialValue={empty ? "" : employee.address}
                canEdit={mode < 2}
                handler={setaddress}
              ></FormInput>

              {/* mobile number */}
              <FormInput
                displayName="Mobile Number"
                initialValue={empty ? "" : employee.mobile}
                canEdit={mode < 2}
                handler={setmobile}
              ></FormInput>

              {/* date of birth */}
              {mode < 2 ? (
                <Form.Group as={Row}>
                  <Form.Label column xs="6" className="prim-blue">
                    Date of Birth
                  </Form.Label>
                  <Col xs="6">
                    <Datetime
                      dateFormat="DD-MM-YYYY"
                      timeFormat={false}
                      onChange={(e) => setdob(moment(e).format("DD-MM-YYYY"))}
                    />
                  </Col>
                </Form.Group>
              ) : (
                <FormInput
                  displayName="Date of Birth"
                  initialValue={empty ? "" : employee.dob}
                  canEdit={mode < 2}
                  handler={setdob}
                ></FormInput>
              )}

              {/* age */}
              <FormInput
                displayName="Age"
                initialValue={empty ? "" : employee.age}
                canEdit={mode < 2}
                handler={setage}
              ></FormInput>

              {/* Gender */}
              <Form.Group as={Row}>
                <Form.Label column xs="6" className="prim-blue">
                  Gender
                </Form.Label>
                <Col xs="6">
                  <Form.Control
                    as="select"
                    disabled={mode === 2}
                    onChange={(e) => setsex(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              {/* caste */}
              <FormInput
                displayName="Caste"
                initialValue={empty ? "" : employee.caste}
                canEdit={mode < 2}
                handler={setcaste}
              ></FormInput>

              {/* marital status */}
              <Form.Group as={Row}>
                <Form.Label column xs="6" className="prim-blue">
                  Marital Status
                </Form.Label>
                <Col xs="6">
                  <Form.Control
                    as="select"
                    disabled={mode === 2}
                    onChange={(e) => setisMarried(e.target.value)}
                  >
                    <option value="Married">Not Married</option>
                    <option value="Not Married">Married</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              {/* languages */}
              <FormInput
                displayName="Languages"
                initialValue={empty ? "" : employee.languages}
                canEdit={mode < 2}
                handler={setlanguages}
              ></FormInput>

              {/* Education */}
              <FormInput
                displayName="Education"
                initialValue={empty ? "" : employee.education}
                canEdit={mode < 2}
                handler={seteducation}
              ></FormInput>

              {/* work exp */}
              <FormInput
                displayName="Work Experience"
                initialValue={empty ? "" : employee.workExperience}
                canEdit={mode < 2}
                handler={setworkExperience}
              ></FormInput>

              {/* action button */}
              {mode !== 2 ? (
                <Button
                  className="my-3 mx-auto block-button"
                  variant="primary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (mode === 0) {
                      addSubmitHandler(e);
                    }
                  }}
                >
                  {mode === 0 ? "Add Employee" : "Update Employee"}
                </Button>
              ) : (
                ""
              )}
              {
                mode===2?<Link to={`/add/job/${employee._id}`}> <Button varaint="warning" className="my-3 block-button">Assign Job</Button></Link>:<></>
              }
            </Form>
          </Container>
            }
        </Col>
      </Row>
    </>
  );
};

export default EmployeeDetails;
