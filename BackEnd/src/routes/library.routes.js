import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addBooks } from "../controllers/library.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/add-book", upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
]), addBooks);

export default router;