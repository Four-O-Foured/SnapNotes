import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createSnapNotes } from "../controllers/snapNotes.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { getAllSnapNotes } from "../controllers/snapNotes.controller.js";
const router = express.Router();

router.use(authMiddleware);



router.post("/create", upload.single("image"), createSnapNotes);

router.get("/all", getAllSnapNotes);

export default router;