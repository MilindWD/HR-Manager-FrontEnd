import {SHOW_TOAST} from '../constants/Other';

const showToastReducer = (state={toastInfo: {}},action) => {
    switch (action.type) {
        case SHOW_TOAST:
            console.log('INSIDE SHOW_TOAST');
            return {toastInfo: action.payload}
        default:
            return state
    }
};

const OtherReducers = {showToastReducer};

export default OtherReducers;