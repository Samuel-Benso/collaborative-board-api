// src/services/boardService.js (Add Column & Card methods)
import prisma from "../config/db.js";

export const createColumn = async (title, boardId) => {
  return await prisma.column.create({
    data: { title, boardId }
  });
};

export const createCard = async (data) => {
  return await prisma.card.create({
    data: {
      title: data.title,
      columnId: data.columnId,
      dueDate: data.dueDate ? new Date(data.dueDate) : null
    }
  });
};

export const updateBoard = async (id, userId, data) => {
  return await prisma.board.update({
    where: { id, userId }, // Ensure the board belongs to the user
    data,
  });
};

export const deleteBoard = async (id, userId) => {
  return await prisma.board.delete({
    where: { id, userId },
  });
};