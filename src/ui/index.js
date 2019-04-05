import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import LeftMenu from "./React/LeftMenu/LeftMenu";
import ReactUp from "./React/ReactUpMenu/ReactUp";
import BottomPanel from "./React/BottomPanel/BottomPanel";
import FileNameModal from './React/modal/FileName';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Redux/rootReducer";

window.store = createStore(rootReducer);

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

    ReactDOM.render(
        <Provider store={store}>
            <FileNameModal />
        </Provider>,
        document.getElementById("modals")
    );
});


if(localStorage.getItem('loaded')=="false"){
    /** @type {Confirmation} */
    let confirm = container.resolve('confirm', [
        ()=>{
            app.restore();
            console.log("restore");
        },()=>{
            app.loaded=true;
            localStorage.setItem('loaded', true);
            console.log("Not restore");
        },
        "The last session was interrupted. Do you want to restore the data?"
    ]);
}

window.onbeforeunload = function(e) {
    if(!app.loaded){
        return "Do you want to save the drawing before  exit?";
    }
};
