import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css'; // Make sure to create this CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/users/login', formData);
      console.log(response.data);
      // Handle success, e.g., save the token and redirect
      localStorage.setItem('token', response.data.token);
      navigate('/home'); // Redirect to the homepage or dashboard
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8" sm="12">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" id="email" required value={formData.email} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" id="password" required value={formData.password} onChange={handleChange} />
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
