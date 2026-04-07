import { Router } from "express";
import { createSubscription } from "../controllers/subscriptions.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/create-subscription", createSubscription);

export default router;