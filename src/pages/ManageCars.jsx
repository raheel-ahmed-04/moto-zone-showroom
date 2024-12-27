import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    carName: "",
    imgUrl: "",
    price: "",
    rating: "",
    description: "",
    model: "",
    automatic: "",
    speed: "",
    gps: "",
    seatType: "",
    brand: "",
  });
  const [editingCar, setEditingCar] = useState(null);

  // Fetch cars from the database
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get("http://localhost:2000/api/cars");
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleAdd = async () => {
    try {
      if (editingCar) {
        const { data } = await axios.put(
          `http://localhost:2000/api/cars/${editingCar._id}`,
          newCar
        );
        setCars(
          cars.map((car) =>
            car._id === editingCar._id ? data.updatedCar : car
          )
        );
      } else {
        const { data } = await axios.post(
          "http://localhost:2000/api/cars",
          newCar
        );
        setCars([...cars, data.car]);
      }
      resetForm();
    } catch (error) {
      console.error("Error adding/updating car:", error);
    }
  };

  const handleEdit = (car) => {
    setNewCar(car);
    setEditingCar(car);
  };

  const resetForm = () => {
    setNewCar({
      carName: "",
      imgUrl: "",
      price: "",
      rating: "",
      description: "",
      model: "",
      automatic: "",
      speed: "",
      gps: "",
      seatType: "",
      brand: "",
    });
    setEditingCar(null);
  };

  return (
    <Container>
      <Row>
        <Col lg="6">
          <h2>{editingCar ? "Edit Car" : "Add a New Car"}</h2>
          <Form>
            <FormGroup>
              <Label for="carName">Car Name</Label>
              <Input
                type="text"
                name="carName"
                value={newCar.carName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="imgUrl">Image URL</Label>
              <Input
                type="text"
                name="imgUrl"
                value={newCar.imgUrl}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                value={newCar.price}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                type="text"
                name="rating"
                value={newCar.rating}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={newCar.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="model">Model</Label>
              <Input
                type="text"
                name="model"
                value={newCar.model}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="automatic">Automatic</Label>
              <Input
                type="text"
                name="automatic"
                value={newCar.automatic}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="speed">Speed</Label>
              <Input
                type="text"
                name="speed"
                value={newCar.speed}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gps">GPS</Label>
              <Input
                type="text"
                name="gps"
                value={newCar.gps}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="seatType">Seat Type</Label>
              <Input
                type="text"
                name="seatType"
                value={newCar.seatType}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="brand">Brand</Label>
              <Input
                type="text"
                name="brand"
                value={newCar.brand}
                onChange={handleChange}
              />
            </FormGroup>
            <Button
              onClick={handleAdd}
              style={{ backgroundColor: "#ffc107", marginRight: "10px" }}
            >
              {editingCar ? "Update Car" : "Add Car"}
            </Button>
            {editingCar && (
              <Button
                onClick={resetForm}
                style={{ backgroundColor: "#ffc107" }}
              >
                Cancel
              </Button>
            )}
          </Form>
        </Col>
        <Col lg="6">
          <h2>Manage Cars</h2>
          {cars.map((car) => (
            <div key={car._id} style={{ marginBottom: "10px" }}>
              <h5>{car.carName}</h5>
              <Button
                onClick={() => handleEdit(car)}
                style={{ backgroundColor: "#ffc107", marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(car._id)}
                style={{ backgroundColor: "black", color: "white" }}
              >
                Delete
              </Button>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ManageCars;
