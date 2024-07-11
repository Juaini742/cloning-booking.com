import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  month?: string;
  date?: string;
  year?: string;
  nationality?: string;
  gender?: string;
  address?: string;
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false, default: null },
  month: { type: String, required: false, default: null },
  date: { type: String, required: false, default: null },
  year: { type: String, required: false, default: null },
  nationality: { type: String, required: false, default: null },
  gender: { type: String, required: false, default: null },
  address: { type: String, required: false, default: null },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
