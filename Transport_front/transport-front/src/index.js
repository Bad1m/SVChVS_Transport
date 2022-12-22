import React from "react";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import repositoryReducer from "./store/reducers/repositoryReducer";
import errorHandlerReducer from "./store/reducers/errorHandlerReducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createRoot } from "react-dom/client";

const rootReducers = combineReducers({
  repository: repositoryReducer,
  errorHandler: errorHandlerReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
registerServiceWorker();
