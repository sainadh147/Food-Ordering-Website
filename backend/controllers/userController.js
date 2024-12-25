import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Password mismatch" });
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: "Failed to login" });
  }
};
// Token Generator
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already registered" });
    //   Validating password and email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8)
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    //   Hashing User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: "Failed to register" });
  }
};

export { loginUser, registerUser };
