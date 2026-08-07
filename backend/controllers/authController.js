import {
    registerUser,
    loginUser,
    getProfile,
} from "../services/authService.js";

export const registerController = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const loginController = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getProfileController = async (req, res, next) => {
    try {
        const user = await getProfile(req.user._id);

        res.status(200).json({
        success: true,
        data: user,
        });
    } catch (error) {
        next(error);
    }
};

import { forgotPassword, resetPassword } from "../services/authService.js";

export const forgotPasswordController = async (req, res, next) => {
    try {
        const resetToken = await forgotPassword(req.body.email);

        // Simulated email send
        const resetUrl = `http://localhost:5174/resetpassword/${resetToken}`;
        console.log(`\n\n[MOCK EMAIL] Password Reset Link: ${resetUrl}\n\n`);

        res.status(200).json({
            success: true,
            message: "Reset token generated. Check console for link.",
            data: resetToken
        });
    } catch (error) {
        next(error);
    }
};

export const resetPasswordController = async (req, res, next) => {
    try {
        const token = await resetPassword(req.params.token, req.body.password);

        res.status(200).json({
            success: true,
            message: "Password reset successful",
            token,
        });
    } catch (error) {
        next(error);
    }
};