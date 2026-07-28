const authService = require("../services/authService");

// ======================
// Register User
// ======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const data = await authService.registerUser({ name, email, password });
    
    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      verificationToken: data.verificationToken,
      data: data.user,
    });
  } catch (error) {
    const status = error.message === "User already exists" ? 400 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

// ======================
// Login User
// ======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    const data = await authService.loginUser({ email, password, ipAddress: req.ip });

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    let status = 500;
    if (error.message.includes("Invalid email or password") || error.message.includes("blocked") || error.message.includes("verify")) {
        status = 401;
    }
    res.status(status).json({ success: false, message: error.message });
  }
};

// ======================
// Get Profile
// ======================
const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(error.message === "User not found" ? 404 : 500).json({ success: false, message: error.message });
  }
};

// ======================
// Change Password
// ======================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, oldPassword, newPassword);
    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : (error.message.includes("incorrect") ? 400 : 500);
    res.status(status).json({ success: false, message: error.message });
  }
};

// ======================
// Update Profile
// ======================
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await authService.updateProfile(req.user.id, { name, email });
    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(error.message === "User not found" ? 404 : 500).json({ success: false, message: error.message });
  }
};

// ======================
// Logout User
// ======================
const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logout successful. Please remove token from client." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================
// Forgot Password
// ======================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = await authService.forgotPassword(email);
    res.status(200).json({ success: true, message: "Password reset token generated", resetToken });
  } catch (error) {
    res.status(error.message === "User not found" ? 404 : 500).json({ success: false, message: error.message });
  }
};

// ======================
// Reset Password
// ======================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    await authService.resetPassword(token, password);
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(error.message.includes("Invalid") ? 400 : 500).json({ success: false, message: error.message });
  }
};

// ======================
// Verify Email
// ======================
const verifyEmail = async (req, res) => {
  try {
    await authService.verifyEmail(req.params.token);
    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(error.message.includes("Invalid") ? 404 : 500).json({ success: false, message: error.message });
  }
};

// ======================
// Dashboard
// ======================
const dashboard = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json({ success: true, message: "Dashboard data fetched successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
  updateProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  dashboard,
};