import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import LeftMenu from "./LeftMenu/LeftMenu";
import ReactUp from "./ReactUpMenu/ReactUp";
import BottomPanel from "./BottomPanel/BottomPanel";
import FileNameModal from './modal/FileName/FileName';
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Switch
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./../Redux/rootReducer";
import Helper from "../../Helper";


window.store = createStore(rootReducer);


let boardn  = container.resolve('mainBoard');
app.board = boardn;


export default class App extends React.Component{
    constructor(props){
        super(props);

        this.canvasContainer=null

    }

    componentDidMount(){
        /** @type {Board} */
        let board = container.resolve('mainBoard');
        board.setSize(this.canvasContainer.clientWidth, this.canvasContainer.clientHeight);
        Helper.Window.addHandler('resize', ()=>{
            board.setSize(0,0);
            board.setSize(this.canvasContainer.clientWidth, this.canvasContainer.clientHeight);

        });
        this.canvasContainer.appendChild(board.canvas);
    }

    render(){
        return (
            <div className="appContainer">
                <Provider store={store}>
                    <Router>
                        <ReactUp />
                    </Router>
                    <section>
                        <LeftMenu />
                        <div className="mainCanvas" ref={(node)=>{this.canvasContainer=node}}>

                        </div>
                    </section>
                    <BottomPanel />
                    <FileNameModal />
                </Provider>
            </div>
        );
    }
}