// Import react and redux
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//React Bootstrap tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link, Redirect } from "react-router-dom";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ExportCSVbtn from "../components/ExportCSVbtn";

//Components
import BackBTN from "../components/BackBTN";
import Unauthorized from "../components/Unauthorized";
import Datetime from "react-datetime";
import moment from "moment";
import jobActionAll from "../actions/Job";

//default values
const { SearchBar } = Search;

//Cell formatters
function employeeLinkFormatter(cell, row, rowIndex) {
  return (
      
    <Link
      to={`/view/employee/${row.employee&&row.employee._id}`}
      className="text-decoration-none p-0 font-weight-bold"
    >
      {cell}
    </Link>
  );
}

function closingDateFormatter(cell, row, rowIndex) {
    if(cell) {
        return (
            cell
        );
    } else return (
        <div style={{color: 'red', fontWeight: 800}}>Not Closed</div>
    )
}





//Table Columns
const columns = [
  {
    dataField: "employee.name",
    text: "Employee Name ",
    formatter: employeeLinkFormatter
  },
  {
    dataField: "customerName",
    text: "Customer Name"
  },
  {
    dataField: "joiningDate",
    text: "Joining Date",
    searchable: false
  },
  {
      dataField: "closingDate",
      text: "Closing Date",
      formatter: closingDateFormatter,
      searchable: false
  },
  {
      dataField: "user.name",
      text: "User"
  }
  
];
const rowClasses = 'custom-row-class-jobs';


//Page
const EmployeeView = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    //hooks
    const [redirect, setRedirect] = useState(null);
    const [authorization, setAuthorization] = useState(true); 

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setRedirect(`/view/job/${row._id}`)
        }
      };
      const jobList = useSelector((state) => state.jobList);
      const { loading, jobs } = jobList;
      useEffect(() => {
        try {
          if (userInfo && userInfo.isAdmin) {
            dispatch(jobActionAll.listJobs(userInfo));
          } else if (userInfo) {
            dispatch(jobActionAll.listJobs(userInfo));
          }
          
        } catch (error) {
          setAuthorization(false);
        }
        
      }, [dispatch, userInfo]);

  const [dateChange, setDateChange] = useState(false);  
  const [localData, setlocalData] = useState([]);
  const [closeChange, setCloseChange] = useState(false);

const [startDate, setstartDate] = useState(useState(moment('01-01-1900').format("DD-MM-YYYY")));
const [endDate, setendDate] = useState(useState(moment('01-01-2100').format("DD-MM-YYYY")));


const handleDateFilter = () => {
  let filtered;
  if(closeChange) {
    filtered = jobs.filter(job =>  {
      return moment(job.joiningDate, 'DD-MM-YYYY') >= moment(startDate)
           && moment(job.joiningDate, 'DD-MM-YYYY') <= moment(endDate)
    });
    filtered = filtered.filter(job => !!job.closingDate)
  }
  else filtered = jobs.filter(job =>  {
    return moment(job.joiningDate, 'DD-MM-YYYY') >= moment(startDate)
         && moment(job.joiningDate, 'DD-MM-YYYY') <= moment(endDate)
  });
  setlocalData(filtered);
  setDateChange(true);
}

const handleOpenFilter = () => {
    let filtered;
    if(dateChange) {
      filtered = jobs.filter(job =>  {
        return moment(job.joiningDate, 'DD-MM-YYYY') >= moment(startDate)
             && moment(job.joiningDate, 'DD-MM-YYYY') <= moment(endDate)
      });
      filtered = filtered.filter(job => !job.closingDate)
    }
    else filtered = jobs.filter(job => !job.closingDate)
    setlocalData(filtered);
    setCloseChange(true);
}



  if(!userInfo||!authorization) {
    return <Unauthorized message="Unauthorized"></Unauthorized>
  }

  if(redirect) {
      return <Redirect to={redirect}></Redirect>
  }


  return (
    <>
      <Row className="py-3">
        <Col xs={{ span: 3, offset: 0 }}>
          <BackBTN></BackBTN>
        </Col>
        <Col xs={{ span: 6, offset: 0 }}>
          <h2 className="table-heading">
            {userInfo.isAdmin ? "All" : userInfo.name} Jobs
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
          data={dateChange||closeChange?localData:jobs}
          columns={columns}
          
          striped
          hover
          search
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
        >
          {(props) => (
            <div>
              <Row>
                <Col xs={8}>  
                <Row>
                    <Col xs={6}> 
                    <SearchBar {...props.searchProps} />
                    </Col>
                    <Col xs={6}>
                    {
                      closeChange?<div></div>:<Button variant="success" onClick={handleOpenFilter}>Show Open</Button>

                    }
                    </Col>
                </Row>
                
                
                </Col>
                <Col xs={4} className="text-right">
                  <ExportCSVbtn {...props.csvProps}></ExportCSVbtn>
                </Col>
              </Row>

              <Row className="my-2">
                <Col xs={12} md={8} lg={6}>

                <Row>
                  <Col xs={4}><Datetime inputProps={{placeholder: 'Start Date'}} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(e) => setstartDate(moment(e))} /></Col>
                  <Col xs={4}><Datetime inputProps={{placeholder: 'End Date'}} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(e) => setendDate(moment(e))}  /></Col>
                  <Col xs={4}><Button variant="primary" onClick={handleDateFilter}>Filter</Button>{'  '}
                  {
                    closeChange||dateChange?<Button variant="warning" onClick={e => {
                      setDateChange(false);
                      setCloseChange(false);
                    }}>Clear All</Button>:<div></div>
                  }
                  
                  </Col>
                </Row>
                
                </Col>
                
              </Row>
              <hr />
              <BootstrapTable
                {...props.baseProps}
                headerWrapperClasses="table-head"
                pagination={paginationFactory()}
                rowClasses={ rowClasses }
                rowEvents={ rowEvents } 
                
              />
            </div>
          )}
          
        </ToolkitProvider>
        
      )}
      {jobList&&console.log(jobList)}
    </>
  );
};

export default EmployeeView;
