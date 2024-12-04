// pages/BikeListing.js
import React from "react";
import { Container, Row, Col } from "reactstrap";
import bikeData from "../assets/data/bikeData";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";

const BikeListing = () => {
  return (
    <Helmet title="Bike Listing">
      <section>
        <Container>
          <Row>
            {bikeData.map((bike, index) => (
              <Col lg="4" md="6" sm="12" key={index}>
                <div className="bike__card">
                  <img src={bike.imgUrl} alt={bike.bikeName} className="w-100" />
                  <h3>{bike.bikeName}</h3>
                  <p>{bike.description}</p>
                  <h4>${bike.price}</h4>
                  <Link to={`/bikes/${bike.bikeName}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeListing;
