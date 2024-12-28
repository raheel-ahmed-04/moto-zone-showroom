import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonSection from "../components/UI/CommonSection";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // 1) Get userName from localStorage
        const userName = localStorage.getItem("userName");
        if (!userName) {
          setError("No user logged in");
          return;
        }

        // 2) Fetch bookings for this user
        const { data } = await axios.get(
          `http://localhost:2000/api/bookings/user/${userName}`
        );
        setBookings(data); // data is an array of bookings
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        setError("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, []);

  // If there's an error, display a message
  if (error) {
    return <h4>{error}</h4>;
  }

  return (
    <>
      <CommonSection title="My Booking History" />
      <div style={{ margin: "50px", padding: "20px" }}>
        {/* If no bookings, show a note */}
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ccc" }}>
                <th style={{ padding: "8px" }}>Booking ID</th>
                <th style={{ padding: "8px" }}>Name</th>
                <th style={{ padding: "8px" }}>Email</th>
                <th style={{ padding: "8px" }}>Phone</th>
                <th style={{ padding: "8px" }}>Address</th>
                <th style={{ padding: "8px" }}>Payment</th>
                <th style={{ padding: "8px" }}>Notes</th>
                <th style={{ padding: "8px" }}>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <td style={{ padding: "8px" }}>{booking._id}</td>
                  <td style={{ padding: "8px" }}>
                    {booking.firstName} {booking.lastName}
                  </td>
                  <td style={{ padding: "8px" }}>{booking.email}</td>
                  <td style={{ padding: "8px" }}>{booking.phone}</td>
                  <td style={{ padding: "8px" }}>{booking.toAddress}</td>
                  <td style={{ padding: "8px" }}>{booking.paymentMethod}</td>
                  <td style={{ padding: "8px" }}>{booking.notes || "N/A"}</td>
                  <td style={{ padding: "8px" }}>
                    {new Date(booking.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default BookingHistory;
