//index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import { User,Car } from "./models.js"; // Ensure the path to your model is correct

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://raheel:raheel724@cluster0.farsr.mongodb.net/motozone",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`The DB is connected with ${port}`);
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

connectDB();

app.post("/register", async (req, res) => {
  const { cnic, name, email, address, phoneNumber, fatherName, password } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({
      cnic,
      name,
      email,
      address,
      phoneNumber,
      fatherName,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const user = await User.findOne({ email });
    console.log("user found:", user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User Login successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Get all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error });
  }
});

// Add a new car
app.post('/api/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({ message: 'Car added successfully', car });
  } catch (error) {
    res.status(500).json({ message: 'Error adding car', error });
  }
});

// Update a car
app.put('/api/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car updated successfully', updatedCar });
  } catch (error) {
    res.status(500).json({ message: 'Error updating car', error });
  }
});

// Delete a car
app.delete('/api/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully', deletedCar });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error });
  }
});



app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
