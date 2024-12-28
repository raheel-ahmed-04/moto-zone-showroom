import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios"; // <-- For making HTTP requests
import "../styles/BikeListing.css"; // Ensure you have this CSS file

const BikeListing = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // Fetch bikes from the backend on component mount
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        // Replace "http://localhost:2000" with your backend server URL/port
        const { data } = await axios.get("http://localhost:2000/api/bikes");
        setBikes(data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };
    fetchBikes();
    // Check localStorage on mount
    const storedUserName = localStorage.getItem("userName");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (storedUserName) {
      setCurrentUser(storedUserName);
    }
    if (isAdmin) {
      setAdmin(isAdmin);
    }
  }, []);

  const handleManageBikes = () => {
    navigate("/manage-bikes");
  };

  return (
    <Helmet title="Bikes">
      <CommonSection title="Bike Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>

                {currentUser && admin && (
                  <Button onClick={handleManageBikes}>Manage Bikes</Button>
                )}
              </div>
            </Col>

            {/* Render all fetched bikes */}
            {bikes.map((bike) => (
              <Col lg="4" md="6" sm="12" className="mb-4" key={bike._id}>
                <div className="bike__item">
                  {/* If an image URL exists, display it */}
                  {bike.imgUrl && (
                    <img
                      src={`${bike.imgUrl}`}
                      alt={bike.bikeName}
                      className="bike__image"
                    />
                  )}

                  <div className="bike__item-content mt-3">
                    <h4 className="section__title text-center">
                      {bike.bikeName}
                    </h4>
                    <h6 className="price text-center mt-2">${bike.price}.00</h6>

                    {/* Example fields: adapt as needed */}
                    <div className="d-flex align-items-center justify-content-center mt-3 mb-4">
                      <span className="d-flex align-items-center me-3">
                        <i className="ri-roadster-line"></i> {bike.model}
                      </span>
                      <span className="d-flex align-items-center me-3">
                        <i className="ri-settings-2-line"></i> {bike.automatic}
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="ri-dashboard-line"></i> {bike.speed}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button className="btn buy__btn">
                        <Link to={`/bikes/${bike.bikeName}`}>Buy Now</Link>
                      </button>
                      <button className="btn details__btn">
                        <Link to={`/bikes/${bike.bikeName}`}>View Details</Link>
                      </button>
                    </div>
                  </div>
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
