import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};