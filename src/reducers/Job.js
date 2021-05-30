import {JOB_LIST_REQUEST, JOB_LIST_SUCCESS, JOB_LIST_FAIL} from '../constants/Job';




const jobReducer = (state={jobs: []},action) => {
    switch (action.type) {
        case JOB_LIST_REQUEST:
            return {loading: true, jobs: []}
        case JOB_LIST_SUCCESS:
            return {...state, loading: false, jobs: action.payload}
        case JOB_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};

const jobReducerAll = {jobReducer};

export default jobReducerAll;