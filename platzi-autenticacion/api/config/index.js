require("dotenv").config();

const config = {
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  allowedOrigins: ["http://localhost:3000", "http://localhost:3001"]
};

module.exports = { config };
