const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/**
 * Generates an Access Token and a Refresh Token
 * @param {string} userId - The user ID
 * @param {string} role - The user role
 * @returns {object} { accessToken, refreshToken }
 */
const generateAuthTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // Access token expires quickly
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Refresh token lasts longer
  );

  return { accessToken, refreshToken };
};

/**
 * Generates a random crypto token for emails (verification, reset password)
 * @returns {string} Random hex string
 */
const generateRandomToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

module.exports = {
  generateAuthTokens,
  generateRandomToken,
};
