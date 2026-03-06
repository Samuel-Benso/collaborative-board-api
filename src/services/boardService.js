import prisma from "../config/db.js";

// 1. ADDED: Create a new board
export const createBoard = async (data, userId) => {
  return await prisma.board.create({
    data: {
      title: data.title,
      userId: userId,
    },
  });
};

// 2. ADDED: Get all boards for a specific user
export const getUserBoards = async (userId) => {
  return await prisma.board.findMany({
    where: { userId },
    include: {
      columns: {
        include: {
          cards: true,
        },
      },
    },
  });
};

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
    where: { id, userId }, 
    data,
  });
};

export const deleteBoard = async (id, userId) => {
  return await prisma.board.delete({
    where: { id, userId },
  });
};