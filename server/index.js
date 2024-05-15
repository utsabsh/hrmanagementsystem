import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// console.log("Loaded environment variables:", process.env);

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", adminRouter);
app.use("/employee", EmployeeRouter);
app.use(express.static("Public"));

// Middleware to verify user authentication
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not autheticated" });
  }
};
app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
