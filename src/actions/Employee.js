import {
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_LIST_SUCCESS,
    EMPLOYEE_LIST_FAIL,
    EMPLOYEE_ADD_REQUEST,
    EMPLOYEE_ADD_SUCCESS,
    EMPLOYEE_ADD_FAIL
} from '../constants/Employee';
import axios from 'axios';

const listEmployees = (user) => async (dispatch) => {
    try {
        dispatch({type: EMPLOYEE_LIST_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        }
        let data;
        if(user.isAdmin) data = await (await axios.get('https://hr-manager-hwhcs.herokuapp.com/api/employees', config)).data;
        else data = await (await axios.get('https://hr-manager-hwhcs.herokuapp.com/api/employees/user/'+user._id, config)).data;
        dispatch({
            type: EMPLOYEE_LIST_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: EMPLOYEE_LIST_FAIL,
            payload: err.response
        });
    }
}

const employeeDetails = (id, token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }
        const {data} = await axios.get(`https://hr-manager-hwhcs.herokuapp.com/api/employees/${id}`, config);
        return data;
    } catch (err) {
        return err.message;
    }
}

const employeeAdd = (body) => async (dispatch) => {
    try {
        dispatch({
            type: EMPLOYEE_ADD_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${body.token}`
            }
        }
        body.token = null;
        console.log(body);
        const {data} = await axios.post('https://hr-manager-hwhcs.herokuapp.com/api/employees/add', 
            body, 
            config
        );
        dispatch({
            type: EMPLOYEE_ADD_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: EMPLOYEE_ADD_FAIL,
            payload: err.message
        })
    }
}

const employeeActionAll = {listEmployees, employeeDetails, employeeAdd};

export default employeeActionAll;