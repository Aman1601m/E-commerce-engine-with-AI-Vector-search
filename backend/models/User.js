import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        isDefault: {
          type: Boolean,
          default: false
        }
      }
    ],

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Generate and hash password token
import crypto from 'crypto';

userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", userSchema);