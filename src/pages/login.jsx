import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; // Make sure to create this CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/login",
        formData
      );

      // Example: { message: "User login successful", userName: "John Doe" }
      console.log("Login Response:", response.data);

      // Store the name in localStorage
      if (response.data?.userName) {
        localStorage.setItem("userName", response.data.userName);
      }

      // Redirect to the homepage or dashboard
      navigate("/home");
    } catch (error) {
      // If there's a server response with status 400, display the message
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        // Otherwise show a generic error
        setErrorMessage("Something went wrong. Please try again.");
      }
      console.error("There was an error!!", error);
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8" sm="12">
            <h2>Login</h2>

            {/* Conditionally render the error message */}
            {errorMessage && (
              <div
                style={{
                  backgroundColor: "#f8d7da",
                  padding: "10px",
                  marginBottom: "10px",
                  color: "#721c24",
                }}
              >
                {errorMessage}
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button type="submit">Login</Button>
            </Form>
            <div className="register-link">
              <span>Don't have an account? </span>
              <Link to="/register">Register here</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
