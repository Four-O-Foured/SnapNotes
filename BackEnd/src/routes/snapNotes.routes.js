import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createSnapNotes } from "../controllers/snapNotes.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();



router.post("/create", authMiddleware, upload.single("image"), createSnapNotes);

export default router;