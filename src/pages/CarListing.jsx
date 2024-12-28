import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // <-- For making HTTP requests

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // Fetch cars from the backend on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Replace "http://localhost:2000" with your backend server URL/port
        const { data } = await axios.get("http://localhost:2000/api/cars");
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
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

  const handleManageCars = () => {
    navigate("/manage-cars");
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
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
                  <Button onClick={handleManageCars}>Manage Cars</Button>
                )}
              </div>
            </Col>

            {/* Render all fetched cars */}
            {cars.map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
