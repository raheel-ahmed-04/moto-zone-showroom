import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models.js"; // Ensure the path to your model is correct

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://192.168.0.131:27017/motozone", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`The DB is connected with ${mongoose.connection.host}`);
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

connectDB();

app.post("/submitregisterform", async (req, res) => {
  const { cnic, name, email, address, phoneNumber, fatherName, password } =
    req.body;
  try {
    const newUser = new User({
      cnic,
      name,
      email,
      address,
      phoneNumber,
      fatherName,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
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

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      "your_jwt_secret", // Replace with your JWT secret
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
