import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; 

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Routes
app.use("/api/auth", authRoutes);

// 3. Health Check (Simplified)
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

// 4. GLOBAL ERROR HANDLER 
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;