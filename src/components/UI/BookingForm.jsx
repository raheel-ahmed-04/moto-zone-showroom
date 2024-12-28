import React, { useState, useEffect } from "react";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";

import "../../styles/booking-form.css";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    userId: "",        // We'll store the DB _id of the user here
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    toAddress: "",
    notes: "",
  });

  const [selectedMethod, setSelectedMethod] = useState("");

  // 1) On mount, fetch user by name from localStorage
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) return; // user not logged in

    // Example: GET /api/users/name/:name
    axios
      .get(`http://localhost:2000/api/users/name/${userName}`)
      .then((res) => {
        const user = res.data; 
        // user = { _id, name, email, address, phoneNumber, ... }

        // Populate bookingData
        setBookingData((prev) => ({
          ...prev,
          userId: user._id,  // store the user ID
          firstName: user.name.split(" ")[0] || user.name, // or parse differently
          lastName: "",      // We only have user.name, so lastName is blank (unless you stored it separately)
          email: user.email,
          phone: user.phoneNumber,
          toAddress: user.address, // Assuming 'address' is the toAddress (adjust logic)
        }));
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  // 2) Handle changes to text fields
  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  // 3) Handle radio change for payment methods
  const handlePaymentChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  // 4) Submit booking
  const submitHandler = (event) => {
    event.preventDefault();

    // Construct booking object
    const payload = {
      userId: bookingData.userId,
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      toAddress: bookingData.toAddress,
      notes: bookingData.notes,
      paymentMethod: selectedMethod,
    };

    axios
      .post("http://localhost:2000/api/bookings", payload)
      .then((res) => {
        console.log("Booking created:", res.data);
        alert("Booking successful!");
        // Optionally reset the form:
        // setBookingData({ ... });
        // setSelectedMethod("");
      })
      .catch((err) => {
        console.error("Error creating booking:", err);
        alert("Failed to create booking");
      });
  };

  return (
    <Form onSubmit={submitHandler}>
      {/* --------- Booking Fields --------- */}
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={bookingData.firstName}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={bookingData.lastName}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={bookingData.email}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={bookingData.phone}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          name="toAddress"
          placeholder="To Address"
          value={bookingData.toAddress}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      
      <FormGroup>
        <textarea
          rows={5}
          name="notes"
          className="textarea"
          placeholder="Additional notes"
          value={bookingData.notes}
          onChange={handleInputChange}
        ></textarea>
      </FormGroup>

      {/* --------- Payment Method Radio Buttons --------- */}
      <div className="payment mt-4">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={selectedMethod === "bank"}
            onChange={handlePaymentChange}
          />
          Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cheque"
            checked={selectedMethod === "cheque"}
            onChange={handlePaymentChange}
          />
          Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="master"
            checked={selectedMethod === "master"}
            onChange={handlePaymentChange}
          />
          Master Card
        </label>
        <img src={masterCard} alt="Master Card" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={handlePaymentChange}
          />
          Paypal
        </label>
        <img src={paypal} alt="PayPal" />
      </div>

      {/* --------- Submit Button --------- */}
      <div className="payment text-end mt-5">
        <button type="submit" disabled={!selectedMethod}>
          Reserve Now
        </button>
      </div>
    </Form>
  );
};

export default BookingForm;
