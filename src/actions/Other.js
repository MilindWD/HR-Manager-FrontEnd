import {SHOW_TOAST} from '../constants/Other';

const showToast = (type, title, message) => async (dispatch) => {
    dispatch({type: SHOW_TOAST, payload: {type, title, message}});
}

const OtherActions = {showToast};

export default OtherActions;