import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";
import * as errorHandlerActions from "./errorHandlerActions";

const getDataSuccess = (data) => {
  return {
    type: actionTypes.GET_DATA_SUCCESS,
    data: data,
  };
};

export const getData = (url, props) => {
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        dispatch(getDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(errorHandlerActions.handleHTTPError(error, props));
      });
  };
};

const postDataSuccess = (response) => {
  return {
    type: actionTypes.POST_DATA_SUCCESS,
    response: response,
  };
};

export const postData = (url, obj, props) => {
  return (dispatch) => {
    axios
      .post(url, obj)
      .then((response) => {
        dispatch(postDataSuccess(response));
      })
      .catch((error) => {
        dispatch(errorHandlerActions.handleHTTPError(error, props));
      });
  };
};

const putDataSuccess = (response) => {
  return {
    type: actionTypes.PUT_DATA_SUCCESS,
    response: response,
  };
};

export const putData = (url, obj, props) => {
  return (dispatch) => {
    axios
      .put(url, obj)
      .then((response) => {
        dispatch(putDataSuccess(response));
      })
      .catch((error) => {
        dispatch(errorHandlerActions.handleHTTPError(error, props));
      });
  };
};

const deleteDataSuccess = (response) => {
  return {
    type: actionTypes.DELETE_DATA_SUCCESS,
    response: response,
  };
};

export const deleteData = (url, props) => {
  return (dispatch) => {
    axios
      .delete(url)
      .then((response) => {
        dispatch(deleteDataSuccess(response));
      })
      .catch((error) => {
        dispatch(errorHandlerActions.handleHTTPError(error, props));
      });
  };
};

export const closeSuccessModal = (props, url) => {
  return {
    type: actionTypes.CLOSE_SUCCESS_MODAL,
    props: props,
    url: url,
  };
};

const execute404Handler = (props) => {
  return {
    type: actionTypes.HTTP_404_ERROR,
    props: props,
  };
};

const execute500Handler = (props) => {
  return {
    type: actionTypes.HTTP_500_ERROR,
    props: props,
  };
};

const executeOtherErrorHandler = (error) => {
  return {
    type: actionTypes.HTTP_OTHER_ERROR,
    error: error,
  };
};

export const handleHTTPError = (error, props) => {
  if (error.response.status === 404) {
    return execute404Handler(props);
  } else if (error.response.status === 500) {
    return execute500Handler(props);
  } else {
    return executeOtherErrorHandler(error);
  }
};
