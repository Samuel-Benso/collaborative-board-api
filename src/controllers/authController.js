import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await userService.createUser({ email, password, name });
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { id: user.id, email: user.email }
    });
  } catch (error) {
    next(error); // Passes to your Global Error Handler in app.js
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);

    // Create JWT Token
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};