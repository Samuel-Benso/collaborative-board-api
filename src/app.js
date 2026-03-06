import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; 
import boardRoutes from "./routes/boardRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// SINGLE GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  // This log is vital—check your VS Code terminal to see the ACTUAL error causing this
  console.error("❌ INTERNAL SERVER ERROR:", err);

  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let validationErrors = null;

  // 1. Safe check for Zod Validation Errors
  // The ?. ensures we don't crash if err.errors is missing
  if (err.name === "ZodError" || (err.errors && Array.isArray(err.errors))) {
    status = 400;
    message = "Validation Failed";
    validationErrors = err.errors?.map(e => ({
      field: e.path[0],
      message: e.message
    }));
  } 
  
  // 2. Handle Prisma Unique Constraint (e.g., duplicate email)
  else if (err.code === 'P2002') {
    status = 400;
    message = "Data conflict: This record already exists.";
  }

  // 3. Send the response
  res.status(status).json({
    success: false,
    message,
    ...(validationErrors && { errors: validationErrors })
  });
});

export default app;