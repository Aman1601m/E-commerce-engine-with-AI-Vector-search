const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateAuthTokens, generateRandomToken } = require("../utils/generateToken");

class AuthService {
  async registerUser({ name, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateRandomToken();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      verificationToken,
    };
  }

  async loginUser({ email, password, ipAddress }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");
    if (!user.isActive) throw new Error("Your account has been blocked.");
    if (!user.isVerified) throw new Error("Please verify your email first.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    user.loginHistory.push({ loginTime: new Date(), ipAddress });

    const { accessToken, refreshToken } = generateAuthTokens(user._id, user.role);
    user.refreshToken = refreshToken;

    await user.save();

    return {
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new Error("User not found");
    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
  }

  async updateProfile(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;

    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const resetToken = generateRandomToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();
    return resetToken;
  }

  async resetPassword(token, newPassword) {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) throw new Error("Invalid or expired reset token");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
  }

  async verifyEmail(token) {
    const user = await User.findOne({ verificationToken: token });
    if (!user) throw new Error("Invalid verification token");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
  }
}

module.exports = new AuthService();
