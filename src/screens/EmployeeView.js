// Import react and redux
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import employeeActionAll from "../actions/Employee";

//React Bootstrap tables
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ExportCSVbtn from "../components/ExportCSVbtn";

//Components
import BackBTN from "../components/BackBTN";
import Unauthorized from "../components/Unauthorized";
import Datetime from "react-datetime";
import moment from "moment";

//default values
const { SearchBar } = Search;

//Cell formatters
function employeeLinkFormatter(cell, row, rowIndex) {
  return (
    <Link
      to={`/view/employee/${row._id}`}
      className="text-decoration-none p-0 font-weight-bold"
    >
      {cell}
    </Link>
  );
}


//Table Columns
const columns = [
  {
    dataField: "name",
    text: "Name ",
    formatter: employeeLinkFormatter,
  },
  {
    dataField: "age",
    text: "Age",
    searchable: false,
  },
  {
    dataField: "sex",
    text: "Gender",
    searchable: false,
  },
  {
    dataField: "mobile",
    text: "Mobile ",
  },
  {
    dataField: `user.name`,
    text: "User"
  }
  
];

//Page
const EmployeeView = () => {

  //Getting values of Employees and User
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { loading, employees, error } = employeeList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(employeeActionAll.listEmployees(userInfo));
    } else if (userInfo) {
      dispatch(employeeActionAll.listEmployees(userInfo));
    }
  }, [dispatch, userInfo]);

  //hooks
  const [change, setChange] = useState(false);  
  const [localData, setlocalData] = useState(""); 
  const [startDate, setstartDate] = useState(useState(moment('01-01-1900').format("DD-MM-YYYY")));
  const [endDate, setendDate] = useState(useState(moment('01-01-2100').format("DD-MM-YYYY")));

  //Event handlers
  const handleDateFilter = () => {
    const filtered = employees.filter(employee =>  moment(employee.createdAt) >= moment(startDate)
          && moment(employee.createdAt) <= moment(endDate));
    setlocalData(filtered);
    setChange(true);
  }

  //rendering
  if (!userInfo||error) {
    return <Unauthorized message="Unauthorized"></Unauthorized>;
  }


  return (
    <>
      <Row className="py-3">
        <Col xs={{ span: 3, offset: 0 }}>
          <BackBTN></BackBTN>
        </Col>

        <Col xs={{ span: 6, offset: 0 }}>
          <h2 className="table-heading">
            {userInfo.isAdmin ? "All" : userInfo.name} Employees
          </h2>
        </Col>
      </Row>
      {loading ? (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <ToolkitProvider
          keyField="id"
          data={change?localData:employees}
          columns={columns}
          filter={filterFactory()}
          striped
          hover
          search={{ defaultSearch: "" }}
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
        >
          {(props) => (
            <div>
              <Row>
                <Col xs={6}>
                  <SearchBar {...props.searchProps} />
                </Col>
                <Col xs={6} className="text-right">
                  <ExportCSVbtn {...props.csvProps}> Export CSV!!</ExportCSVbtn>
                </Col>
              </Row>
              <Row className="my-2">
                <Col xs={12} md={8} lg={6}>
                <Row>
                  <Col xs={4}><Datetime inputProps={{placeholder: 'Start Date'}} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(e) => setstartDate(moment(e))}/></Col>
                  <Col xs={4}><Datetime inputProps={{placeholder: 'End Date'}} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(e) => setendDate(moment(e))} /></Col>
                  <Col xs={2}><Button variant="primary" onClick={handleDateFilter}>Filter</Button></Col>
                  <Col xs={2}>{
                    change?<Button variant="warning" onClick={e => setChange(false)}>Clear</Button>:<div></div>
                  }</Col>
                </Row>
                
                </Col>
                
              </Row>
              <hr />
              <BootstrapTable
                {...props.baseProps}
                headerWrapperClasses="table-head"
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default EmployeeView;
