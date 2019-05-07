import React from "react";
import ReactDOM from "react-dom";
import App from "./React/App";



addEventListener("load", function() {
    ReactDOM.render(
        <App/>,
        document.getElementById("app")
    );

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

});
