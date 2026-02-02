import express from "express";
import {
  createNote,
  deleteNote,
  getAll,
  updateNote,
  getByID,
} from "../controller/notesController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getByID);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;