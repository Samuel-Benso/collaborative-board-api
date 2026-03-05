import prisma from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async ({ email, password, name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { email, password: hashedPassword, name }
  });
};

export const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  return user;
};