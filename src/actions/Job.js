import axios from 'axios';
import {JOB_LIST_REQUEST, JOB_LIST_SUCCESS, JOB_LIST_FAIL} from '../constants/Job';


const listJobs = (user) => async (dispatch) => {
    try {
        dispatch({type: JOB_LIST_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        }
        let data;
        if(!user) data = await (await axios.get('https://hr-manager-hwhcs.herokuapp.com/api/jobs', config)).data;
        else data = await (await axios.get('https://hr-manager-hwhcs.herokuapp.com/api/jobs/user/'+user._id, config)).data;
        dispatch({
            type: JOB_LIST_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: JOB_LIST_FAIL,
            payload: err.response
        });
    }
}

const jobActionAll = {listJobs};

export default jobActionAll;