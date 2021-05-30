//Import Reducers
import employeeReducerAll from './reducers/Employee.js';
import UserReducer from './reducers/User.js';
import OtherReducers from './reducers/Other.js';
import jobReducerAll from './reducers/Job';
//Main store functionalities
const {createStore, combineReducers, applyMiddleware} = require('redux');
//Async request middleware
const thunk = require('redux-thunk').default;
//Devtools integration 
const {composeWithDevTools} = require('redux-devtools-extension');
//--------------------------------------------------------------------

//DECLARATIONS 
//combine reducers
const reducer = combineReducers({
    employeeList: employeeReducerAll.employeeReducer,
    employeeDetails: employeeReducerAll.employeeDetailsReducer,
    userLogin: UserReducer.userLoginReducer,
    toast: OtherReducers.showToastReducer,
    employeeAdd: employeeReducerAll.employeeAddReducer,
    jobList: jobReducerAll.jobReducer
});

//At page load  
const userInfoFromStorage = localStorage.getItem('userInfo')  
? JSON.parse(localStorage.getItem('userInfo'))
: null;

const toastConfig = {
    type: 'normal',
    message: 'Welcome',
    title: 'HR manager 1.0'
}

//Our initial Store
const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    toast: {toastInfo: toastConfig}
};
//Middlewares
const middleware = [thunk]
//-------------------------------------------------------------------

//ACTUAL STORE
const store = createStore(reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
); 
//-------------------------------------------------------------------

//EXPORTS
export default store;