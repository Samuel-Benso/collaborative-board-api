export const validate = (schema) => (req, res, next) => {
  try {
    // Parse the body; if it fails, it throws an error to the catch block
    schema.parse(req.body);
    next();
  } catch (error) {
    // Return a clean error message to the user
    return res.status(400).json({
      success: false,
      errors: error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }
};