import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";

const CarDetails = () => {
  const { slug } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  // Fetch car from backend using slug
  useEffect(() => {
    const fetchCar = async () => {
      try {
        // Example endpoint: GET /api/cars/slug/<slug>
        // Adjust if your backend route differs
        const response = await axios.get(
          `http://localhost:2000/api/cars/slug/${slug}`
        );
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Car not found!");
      }
    };

    fetchCar();
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [slug]);

  if (error) {
    return <h2>{error}</h2>;
  }
  if (!car) {
    return <h2>Loading car...</h2>;
  }

  return (
    <Helmet title={car.carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={`${car.imgUrl || ""}`}
                alt={car.carName}
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{car.carName}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="price fw-bold fs-4">${car.price}.00</h6>

                  <span className="d-flex align-items-center gap-2">
                    {/* Sample 5-star rating (or dynamic) */}
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({car.rating} ratings)
                  </span>
                </div>

                <p className="section__description">{car.description}</p>

                <div
                  className="d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.model}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.automatic}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.speed}
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-map-pin-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.gps}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.seatType}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.brand}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold">Purchase Information</h5>
                <BookingForm
                  vehicleRef={car._id} // The car's Mongo _id
                  vehicleRefModel="Car" // EXACT model name in Mongoose
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
