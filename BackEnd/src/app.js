import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import snapNotesRoutes from "./routes/snapNotes.routes.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/snap", snapNotesRoutes);

app.use(globalErrorHandler);

export default app;
