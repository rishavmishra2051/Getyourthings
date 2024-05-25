import React from 'react';
import { useLocation } from "react-router-dom";
const PaymentTest = () => {
  const location = useLocation();
  const amount = location.state.amount;
  console.log(amount);
  return (
    <div>
      <h1>{amount}</h1>
    </div>
  );
}

export default PaymentTest;
