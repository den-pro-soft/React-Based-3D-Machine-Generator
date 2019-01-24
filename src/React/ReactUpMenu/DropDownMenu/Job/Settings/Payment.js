import React from "react";
import "./payment.scss";
import {withRouter} from 'react-router-dom';

const Payment = context => {
console.log(context, 'pymenta');
  return (
    <div className="Payment">
  <button>
  Payment </button>
    </div>
  );
};

export default Payment ;