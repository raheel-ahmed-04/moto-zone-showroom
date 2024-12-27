//models.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  cnic: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fatherName: { type: String },
  password: { type: String, required: true },
});

// Car Schema
const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  automatic: { type: String, required: true },
  speed: { type: String, required: true },
  gps: { type: String, required: true },
  seatType: { type: String, required: true },
  brand: { type: String, required: true }
});

export const User = mongoose.model("User", userSchema);
export const Car = mongoose.model("Car", carSchema);
