// src/pages/ManageCars.jsx
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
  // We'll store the file here
  const [imageFile, setImageFile] = useState(null);
  const [editingCar, setEditingCar] = useState(null);

  // Fetch cars from backend
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

  // Text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  // File field changes
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // The file object
  };

  const resetForm = () => {
    setNewCar({
      carName: "",
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
    setImageFile(null);
    setEditingCar(null);
  };

  // Add or update car
  const handleAddOrUpdateCar = async () => {
    try {
      // We use FormData to send both text fields + file
      const formData = new FormData();
      formData.append("carName", newCar.carName);
      formData.append("price", newCar.price);
      formData.append("rating", newCar.rating);
      formData.append("description", newCar.description);
      formData.append("model", newCar.model);
      formData.append("automatic", newCar.automatic);
      formData.append("speed", newCar.speed);
      formData.append("gps", newCar.gps);
      formData.append("seatType", newCar.seatType);
      formData.append("brand", newCar.brand);

      // Append file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingCar) {
        // Update existing car
        const { data } = await axios.put(
          `http://localhost:2000/api/cars/${editingCar._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // Replace old car data with updated data
        setCars((prev) =>
          prev.map((car) =>
            car._id === editingCar._id ? data.updatedCar : car
          )
        );
      } else {
        // Add new car
        const { data } = await axios.post(
          "http://localhost:2000/api/cars",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setCars((prev) => [...prev, data.car]);
      }
      resetForm();
    } catch (error) {
      console.error("Error adding/updating car:", error);
    }
  };

  // Enter edit mode
  const handleEdit = (car) => {
    setNewCar({
      carName: car.carName || "",
      price: car.price || "",
      rating: car.rating || "",
      description: car.description || "",
      model: car.model || "",
      automatic: car.automatic || "",
      speed: car.speed || "",
      gps: car.gps || "",
      seatType: car.seatType || "",
      brand: car.brand || "",
    });
    setImageFile(null);
    setEditingCar(car);
  };

  // Delete a car
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/cars/${id}`);
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
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

            {/* File Input for Image */}
            <FormGroup>
              <Label for="image">Car Image</Label>
              <Input type="file" name="image" onChange={handleFileChange} />
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
              color="warning"
              style={{ marginRight: "10px" }}
              onClick={handleAddOrUpdateCar}
            >
              {editingCar ? "Update Car" : "Add Car"}
            </Button>
            {editingCar && (
              <Button color="warning" onClick={resetForm}>
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

              {/* Show uploaded image if exists */}
              {car.imgUrl && (
                <img
                  src={`${car.imgUrl}`}
                  alt={car.carName}
                  style={{ width: "100px", height: "60px", objectFit: "cover" }}
                />
              )}
              <div style={{ marginTop: "5px" }}>
                <Button
                  color="warning"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleEdit(car)}
                >
                  Edit
                </Button>
                <Button
                  color="dark"
                  style={{ color: "white" }}
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ManageCars;
