import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import snapNotesRoutes from "./routes/snapNotes.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: "https://snapnotes-pjcr.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/snap", snapNotesRoutes);
app.use("/api/library", libraryRoutes);
app.use(express.static(path.join(__dirname, "../public/buildDist")));


app.use(globalErrorHandler);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/buildDist/index.html"));
});

export default app;
