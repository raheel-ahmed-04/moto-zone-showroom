import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import axios from "axios"; // <-- so we can fetch from backend
import Helmet from "../components/Helmet/Helmet";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import "../styles/BikeDetails.css"; // Ensure you have the CSS file

const BikeDetails = () => {
  const { slug } = useParams();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState("");

  // Fetch bike from backend using slug
  useEffect(() => {
    const fetchBike = async () => {
      try {
        // Example endpoint: GET /api/bikes/slug/<slug>
        // Adjust if your backend route differs (e.g. /api/bikes/:slug)
        const response = await axios.get(
          `http://localhost:2000/api/bikes/slug/${slug}`
        );
        setBike(response.data);
      } catch (err) {
        console.error("Error fetching bike:", err);
        setError("Bike not found!");
      }
    };

    fetchBike();
  }, [slug]);

  // If there's an error or no bike found, show a message
  if (error) {
    return <h2>{error}</h2>;
  }
  if (!bike) {
    return <h2>Loading bike...</h2>;
  }

  return (
    <Helmet title={bike.bikeName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              {/* If you store just the path (e.g. "/uploads/xyz.jpg"), prepend your server URL */}
              <img
                src={`${bike.imgUrl || ""}`}
                alt={bike.bikeName}
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="bike__info">
                <h2 className="section__title">{bike.bikeName}</h2>
                <h6 className="price">${bike.price}.00</h6>
                <p className="section__description">{bike.description}</p>

                <div className="d-flex align-items-center mt-3">
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-roadster-line"></i> {bike.model}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-settings-2-line"></i> {bike.automatic}
                  </span>
                </div>

                <div className="d-flex align-items-center mt-3">
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-dashboard-line"></i> {bike.speed}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-building-2-line"></i> {bike.brand}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <BookingForm
                vehicleRef={bike._id} // The bike's Mongo _id
                vehicleRefModel="Bike"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeDetails;
