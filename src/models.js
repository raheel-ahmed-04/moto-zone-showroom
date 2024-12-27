// models.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* --------------------- USER SCHEMA --------------------- */
const userSchema = new mongoose.Schema({
  cnic: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fatherName: { type: String },
  password: { type: String, required: true },
});

// Automatically hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

/* --------------------- CAR SCHEMA --------------------- */
const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  imgUrl: { type: String }, // If you're storing an image path, make this optional or required as you prefer
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  automatic: { type: String, required: true },
  speed: { type: String, required: true },
  gps: { type: String, required: true },
  seatType: { type: String, required: true },
  brand: { type: String, required: true },
});

/* --------------------- BIKE SCHEMA --------------------- */
const bikeSchema = new mongoose.Schema({
  bikeName: { type: String, required: true },
  imgUrl: { type: String }, // If storing an image path
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  speed: { type: String, required: true },
  gps: { type: String, required: true },
  seatType: { type: String, required: true },
  automatic: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
});

/* --------------------- EXPORT MODELS --------------------- */
export const User = mongoose.model("User", userSchema);
export const Car = mongoose.model("Car", carSchema);
export const Bike = mongoose.model("Bike", bikeSchema);
