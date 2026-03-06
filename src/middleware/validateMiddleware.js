export const validate = (schema) => (req, res, next) => {
  try {
    // Parse the body; if it fails, it throws to the catch block
    schema.parse(req.body);
    next();
  } catch (error) {
    // Check if it's actually a Zod validation error before mapping
    if (error.errors) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }

    // If it's NOT a Zod error, pass it to our global handler in app.js
    next(error);
  }
};