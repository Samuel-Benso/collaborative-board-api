import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // 1. Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // 2. Return 401 if no token is found
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Not authorized, no token provided" 
    });
  }

  try {
    // 3. Verify the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    /**
     * 4. ATTACH USER DATA
     * We wrap decoded.userId into an object so that req.user.userId 
     * works in your boardController.js logic.
     */
    req.user = { 
      userId: decoded.userId 
    };
    
    next();
  } catch (error) {
    // 5. Handle expired or malformed tokens
    res.status(401).json({ 
      success: false, 
      message: "Token is invalid or expired" 
    });
  }
};