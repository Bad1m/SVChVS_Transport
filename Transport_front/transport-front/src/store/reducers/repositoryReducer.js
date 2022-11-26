import * as actionTypes from "../actions/actionTypes";
import { useNavigate } from "react-router-dom";

const initialState = {
  data: null,
  showSuccessModal: false,
};

const executeGetDataSuccess = (state, action) => {
  return {
    ...state,
    data: action.data,
  };
};

const executePostDataSuccess = (state, action) => {
  return {
    ...state,
    showSuccessModal: true,
  };
};

const executePutDataSuccess = (state, action) => {
  return {
    ...state,
    showSuccessModal: true,
  };
};

const executeDeleteDataSuccess = (state, action) => {
  return {
    ...state,
    showSuccessModal: true,
  };
};

const executeCloseSuccessModal = (state, action) => {
  //action.props.history.push(action.url);
  // let navigate = useNavigate();
  // browserHistory.push(action.url);
  return {
    ...state,
    showSuccessModal: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_SUCCESS_MODAL:
      return executeCloseSuccessModal(state, action);
    case actionTypes.GET_DATA_SUCCESS:
      return executeGetDataSuccess(state, action);
    case actionTypes.POST_DATA_SUCCESS:
      return executePostDataSuccess(state, action);
    case actionTypes.PUT_DATA_SUCCESS:
      return executePutDataSuccess(state, action);
    case actionTypes.DELETE_DATA_SUCCESS:
      return executeDeleteDataSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
