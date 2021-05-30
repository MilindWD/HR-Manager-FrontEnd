import {
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_LIST_SUCCESS,
    EMPLOYEE_LIST_FAIL,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_SUCCESS,
    EMPLOYEE_DETAILS_FAIL,
    EMPLOYEE_ADD_SUCCESS,
    EMPLOYEE_ADD_FAIL,
    EMPLOYEE_ADD_REQUEST
} from '../constants/Employee';

const employeeReducer = (state={employees: []},action) => {
    switch (action.type) {
        case EMPLOYEE_LIST_REQUEST:
            return {loading: true, employees: []}
        case EMPLOYEE_LIST_SUCCESS:
            return {...state, loading: false, employees: action.payload}
        case EMPLOYEE_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};

const employeeDetailsReducer = (state={employee: []},action) => {
    switch (action.type) {
        case EMPLOYEE_DETAILS_REQUEST:
            return {loading: true, ...state}
        case EMPLOYEE_DETAILS_SUCCESS:
            return {loading: false, employee: action.payload}
        case EMPLOYEE_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};

const employeeAddReducer = (state={}, action) => {
    switch (action.type) {
        case EMPLOYEE_ADD_REQUEST:
            return {loading: true}
        case EMPLOYEE_ADD_SUCCESS:
            return {loading: false, employeeInfo: action.payload}
        case EMPLOYEE_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};



const employeeReducerAll = {employeeReducer, employeeDetailsReducer, employeeAddReducer};

export default employeeReducerAll;