import React, { useState } from "react";

import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
  // Track which payment method is selected
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <>
      {/* Bank Transfer */}
      <div className="payment">
        <label className="d-flex align-items-center gap-2">
          {/* Same name, unique value */}
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={selectedMethod === "bank"}
            onChange={handleChange}
          />
          Direct Bank Transfer
        </label>
      </div>

      {/* Cheque Payment */}
      <div className="payment mt-3">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cheque"
            checked={selectedMethod === "cheque"}
            onChange={handleChange}
          />
          Cheque Payment
        </label>
      </div>

      {/* Master Card */}
      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="master"
            checked={selectedMethod === "master"}
            onChange={handleChange}
          />
          Master Card
        </label>
        <img src={masterCard} alt="Master Card" />
      </div>

      {/* PayPal */}
      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={handleChange}
          />
          Paypal
        </label>
        <img src={paypal} alt="PayPal" />
      </div>

      {/* Reserve Button */}
      <div className="payment text-end mt-5">
        <button
          disabled={!selectedMethod}
          onClick={() => console.log("Reserved with:", selectedMethod)}
        >
          Reserve Now
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
