import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import LeftMenu from "./React/LeftMenu/LeftMenu";
import ReactUp from "./React/ReactUpMenu/ReactUp";
import BottomPanel from "./React/BottomPanel/BottomPanel";
import {
  // BrowserRouter as Router,
  HashRouter as Router,Switch
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Redux/rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
  <div className="root-LeftMenu">
    <LeftMenu />
  </div>,
  document.getElementById("LeftMenu")
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ReactUp />
    </Router>
  </Provider>,
  document.getElementById("UpMenu")
);

addEventListener("load", function() {
  ReactDOM.render(
    <Provider store={store}>
      <BottomPanel />
    </Provider>,
    document.getElementById("BottomPanel")
  );
});
