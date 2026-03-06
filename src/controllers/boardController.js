// src/controllers/boardController.js 

import * as boardService from "../services/boardService.js";

export const createBoard = async (req, res, next) => {
  try {
    const { title } = req.body;
    
    // Check both common locations for the user ID
    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User ID not found in token. Please log in again." 
      });
    }

    const newBoard = await boardService.createBoard({ title }, userId);
    
    res.status(201).json({ success: true, data: newBoard });
  } catch (error) {
    next(error);
  }
};

export const getMyBoards = async (req, res, next) => {
  try {
    // We use req.user.userId from your authMiddleware
    const boards = await boardService.getUserBoards(req.user.userId);
    res.json({ success: true, data: boards });
  } catch (error) {
    next(error);
  }
};

export const addColumn = async (req, res, next) => {
  try {
    const { title, boardId } = req.body;
    
    // We call the service function we verified earlier
    const newColumn = await boardService.createColumn(title, boardId);
    
    res.status(201).json({ success: true, data: newColumn });
  } catch (error) {
    next(error);
  }
};

export const addCard = async (req, res, next) => {
  try {
    const card = await boardService.createCard(req.body);
    res.status(201).json({ success: true, data: card });
  } catch (error) { next(error); }
};

export const editBoard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedBoard = await boardService.updateBoard(id, title);
    res.json({ success: true, data: updatedBoard });
  } catch (error) {
    next(error);
  }
};

export const removeBoard = async (req, res, next) => {
  try {
    const { id } = req.params;
    await boardService.deleteBoard(id);
    res.json({ success: true, message: "Board deleted successfully" });
  } catch (error) {
    next(error);
  }
};