import React, { useEffect } from "react";
import bikeData from "../assets/data/bikeData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, Navigate } from "react-router-dom"; // Using Navigate for redirection
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";

const BikeDetails = () => {
  const { slug } = useParams();

  // Find the bike item based on slug
  const singleBikeItem = bikeData.find(
    (item) => item.bikeName.toLowerCase() === slug.toLowerCase()
  );

  // useEffect hook should be unconditional
  useEffect(() => {
    // Scroll to top whenever the component renders
    window.scrollTo(0, 0);
  }, []); // Empty array ensures this runs only once when the component mounts

  // Conditional rendering of 404 page if no bike found
  if (!singleBikeItem) {
    return <Navigate to="/404" />;
  }

  return (
    <Helmet title={singleBikeItem.bikeName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              {/* Using the fallback image if imgUrl is not found */}
              <img
                src={singleBikeItem.imgUrl || "/assets/all-images/bikes-img/bike1.png"} // Fallback image
                alt={singleBikeItem.bikeName}
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="bike__info">
                <h2 className="section__title">{singleBikeItem.bikeName}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="price fw-bold fs-4">${singleBikeItem.price}.00</h6>
                </div>

                <p className="section__description">
                  {singleBikeItem.description}
                </p>

                <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    {singleBikeItem.model}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    {singleBikeItem.type}
                  </span>
                </div>

                <div className="d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    {singleBikeItem.brand}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold">Purchase Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeDetails;


