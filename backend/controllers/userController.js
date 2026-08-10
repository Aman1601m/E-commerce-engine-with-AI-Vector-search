import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ==============================
// Get All Users
// ==============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      isDeleted: false,
    }).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single User
// ==============================
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update User
// ==============================
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Soft Delete User
// ==============================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isDeleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Block / Unblock User
// ==============================
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "blocked"} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Dashboard Statistics
// ==============================
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isDeleted: false });
    const activeUsers = await User.countDocuments({ isDeleted: false, isActive: true });
    const blockedUsers = await User.countDocuments({ isDeleted: false, isActive: false });
    const verifiedUsers = await User.countDocuments({ isDeleted: false, isVerified: true });
    const adminCount = await User.countDocuments({ isDeleted: false, role: 'admin' });
    const customerCount = await User.countDocuments({ isDeleted: false, role: 'customer' });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        blockedUsers,
        verifiedUsers,
        adminCount,
        customerCount,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Profile (Aman's code moved here)
// ==============================
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Handle split name if provided from frontend
    if (req.body.name) {
      const nameParts = req.body.name.trim().split(' ');
      user.firstName = nameParts[0] || user.firstName;
      user.lastName = nameParts.slice(1).join(' ') || user.lastName;
    }

    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName !== undefined) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;
    if (req.body.phone !== undefined) user.phone = req.body.phone;
    if (req.body.addresses) user.addresses = req.body.addresses;

    const updatedUser = await user.save();
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// Change Password (Aman's code moved here)
// ==============================
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect old password" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// Get Wishlist
// ==============================
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// Add to Wishlist
// ==============================
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { productId } = req.body;
    
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    const populatedUser = await User.findById(req.user._id).populate('wishlist');

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist: populatedUser.wishlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// Remove from Wishlist
// ==============================
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { productId } = req.params;
    
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    const populatedUser = await User.findById(req.user._id).populate('wishlist');

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist: populatedUser.wishlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};