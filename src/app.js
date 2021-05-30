//Basic react imports
import React from "react";

//Router for react
import { BrowserRouter as Router, Route } from "react-router-dom";

//Bootstrap imports
import { Container } from "react-bootstrap";

//Importing Components
import Header from './components/Header';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import EmployeeView from './screens/EmployeeView';
import EmployeeDetails from './screens/EmployeeDetails';
import JobDetails from './screens/JobDetails';
import JobView from './screens/JobView';
import Test from './screens/Test';
import Payment from './screens/Payment';



//rendering 
const App = () => {
  
  return (
    <Router>
        <Header />
      <Container>
        <main className="py-3">
          <Route path='/' component={HomePage} exact/>
          <Route path='/login' component={LoginPage} />
          <Route path='/view/employees' component={EmployeeView} />
          <Route path='/view/employee/:id' component={EmployeeDetails} />
          <Route path='/add/employee' component={EmployeeDetails} />
          <Route path='/update/employee/:id' component={EmployeeDetails} />
          <Route path='/view/job/:id' component={JobDetails} />
          <Route path='/add/job/:id' component={JobDetails} />
          <Route path='/view/jobs' component={JobView} />
          <Route path='/payment/:id' component={Payment} />
          <Route path='/test' component={Test} />
        </main>
      </Container>
    </Router>
  );
};

export default App;
