import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/bikes", // Added "Bike" section link
    display: "Bikes", // Display name for Bike section
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const [isRegisterFormVisible, setRegisterFormVisible] = useState(false); // State for form visibility
  const location = useLocation(); // Used to detect page changes

  // Toggle Register Form visibility
  const toggleRegisterForm = () => {
    setRegisterFormVisible((prevState) => !prevState); // Toggle form visibility
  };

  // When the page changes, we ensure the form is hidden
  React.useEffect(() => {
    setRegisterFormVisible(false); // Hide form when page changes
  }, [location]);

  return (
    <header className="header">
      {/* Header Top */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +92-3105789904
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="#" className=" d-flex align-items-center gap-1">
                  <i className="ri-login-circle-line"></i> Login
                </Link>
                {/* Register button triggers form visibility */}
                <button onClick={toggleRegisterForm} className="d-flex align-items-center gap-1">
                  <i className="ri-user-line"></i> Register
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Header Middle */}
      <div className="header__middle">
        <Container>
          <Row className="align-items-center">
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>
                      Moto Zone <br /> Showroom
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="4" md="5" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Pakistan</h4>
                  <h6>Wah Cantt, Islamabad</h6>
                </div>
              </div>
            </Col>

            <Col lg="4" md="4" sm="4" className="d-flex align-items-center justify-content-end">
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Navigation */}
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line"></i>
            </span>

            <div className="navigation">
              <div className="menu">
                {navLinks.map((link, index) => (
                  <NavLink
                    to={link.path}
                    key={index}
                    className="nav__item"
                    activeClassName="nav__active"
                  >
                    {link.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="search__box">
              <input type="text" placeholder="Search" />
              <span>
                <i className="ri-search-line"></i>
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Registration Form (Conditional Rendering) */}
      {isRegisterFormVisible && (
        <div className="register-form">
          <Container>
            <Row className="justify-content-center">
              <Col lg="6" md="8" sm="12">
                <h2>Register</h2>
                <Form>
                  {/* CNIC Field comes before Name */}
                  <FormGroup>
                    <Label for="cnic">CNIC</Label>
                    <Input type="text" id="cnic" required />
                  </FormGroup>

                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" id="name" required />
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" required />
                  </FormGroup>

                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" id="address" required />
                  </FormGroup>

                  <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="tel" id="phoneNumber" required />
                  </FormGroup>

                  <FormGroup>
                    <Label for="occupation">Occupation</Label>
                    <Input type="text" id="occupation" />
                  </FormGroup>

                  {/* Removed "Mother's Name" field */}
                  <FormGroup>
                    <Label for="fatherName">Father's Name</Label>
                    <Input type="text" id="fatherName" />
                  </FormGroup>

                  <FormGroup>
                    <Label for="selectedCar">Selected Car</Label>
                    <Input type="text" id="selectedCar" required />
                  </FormGroup>

                  <FormGroup>
                    <Label for="queryType">Query Type</Label>
                    <Input type="text" id="queryType" />
                  </FormGroup>

                  <Button type="submit">Submit</Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;

