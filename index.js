// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { User, Car } from "./models.js"; // Update path if needed

const app = express();
const port = 2000;

// 1) Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2) Serve the uploads folder as static
//    So that http://localhost:2000/uploads/<filename> can serve images
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// 3) Configure Multer to store images in "public/uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "uploads")); // Folder to store images
  },
  filename: (req, file, cb) => {
    // Create a unique filename; e.g. 1691862034567-myphoto.png
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://raheel:raheel724@cluster0.farsr.mongodb.net/motozone",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};
connectDB();

/* ---------------- USER ROUTES ---------------- */
app.post("/register", async (req, res) => {
  const { cnic, name, email, address, phoneNumber, fatherName, password } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
    const user = await User.findOne({ email });
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

/* ---------------- CAR ROUTES ---------------- */

// GET all cars
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error });
  }
});

// CREATE a new car (with file upload)
app.post("/api/cars", upload.single("image"), async (req, res) => {
  try {
    const {
      carName,
      price,
      rating,
      description,
      model,
      automatic,
      speed,
      gps,
      seatType,
      brand,
    } = req.body;

    // If the file was uploaded, store the relative path in DB (e.g. "/uploads/12345-someimage.png")
    let imgUrl = "";
    if (req.file) {
      imgUrl = "/uploads/" + req.file.filename;
    }

    const newCar = new Car({
      carName,
      imgUrl, // Image path
      price,
      rating,
      description,
      model,
      automatic,
      speed,
      gps,
      seatType,
      brand,
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: "Error adding car", error });
  }
});

// UPDATE a car (with optional new image)
app.put("/api/cars/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carName,
      price,
      rating,
      description,
      model,
      automatic,
      speed,
      gps,
      seatType,
      brand,
    } = req.body;

    let updatedFields = {
      carName,
      price,
      rating,
      description,
      model,
      automatic,
      speed,
      gps,
      seatType,
      brand,
    };

    // If the user uploads a new image, update the imgUrl
    if (req.file) {
      updatedFields.imgUrl = "/uploads/" + req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error });
  }
});

// DELETE a car
app.delete("/api/cars/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully", deletedCar });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car", error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
