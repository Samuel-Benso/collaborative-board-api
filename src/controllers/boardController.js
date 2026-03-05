// src/controllers/boardController.js 
export const addColumn = async (req, res, next) => {
  try {
    const { title, boardId } = req.body;
    const column = await boardService.createColumn(title, boardId);
    res.status(201).json({ success: true, data: column });
  } catch (error) { next(error); }
};

export const addCard = async (req, res, next) => {
  try {
    const card = await boardService.createCard(req.body);
    res.status(201).json({ success: true, data: card });
  } catch (error) { next(error); }
};

export const editBoard = async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.user.userId, req.body);
    res.json({ success: true, data: board });
  } catch (error) { next(error); }
};

export const removeBoard = async (req, res, next) => {
  try {
    await boardService.deleteBoard(req.params.id, req.user.userId);
    res.json({ success: true, message: "Board deleted successfully" });
  } catch (error) { next(error); }
};