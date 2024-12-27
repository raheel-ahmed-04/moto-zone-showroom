import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  cnic: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fatherName: { type: String },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
