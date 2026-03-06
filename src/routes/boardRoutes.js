import express from "express";
import { 
  createBoard, 
  getMyBoards, 
  addColumn, 
  addCard,
  editBoard,
  removeBoard 
} from "../controllers/boardController.js";
import { createBoardSchema, updateBoardSchema } from "../validators/boardValidator.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { createColumnSchema } from "../validators/columnValidator.js";
import { createCardSchema } from "../validators/cardValidator.js";

const router = express.Router();

// 1. Security Layer: All routes below need a valid JWT token
router.use(protect);

// 2. Board Endpoints
router.post("/", validate(createBoardSchema), createBoard);
router.get("/", getMyBoards);

// Board CRUD
router.put("/:id", validate(updateBoardSchema), editBoard);    // Updated
router.delete("/:id", removeBoard);                             // Updated

// 3. Column Endpoints (Nested under boards conceptually)
router.post("/columns", validate(createColumnSchema), addColumn);

// 4. Card Endpoints
router.post("/cards", validate(createCardSchema), addCard);

export default router;