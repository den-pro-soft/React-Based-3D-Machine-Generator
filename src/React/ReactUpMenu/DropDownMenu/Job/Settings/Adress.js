import React from "react";
import "./Adress.scss";
import {withRouter} from 'react-router-dom';

const Adress = context => {
console.log(context,'context in Adress')
  return (
    <div className="Adress">
  <button>
  Adress</button>
    </div>
  );
};

export default withRouter(Adress);