import { asyncHandler } from "../utils/asyncHandler.js"
import { createSnapNotesService } from "../services/snapNotes.services.js";
import { createSnapNotesDAO } from "../DAO/snapNotes.dao.js";

export const createSnapNotes = asyncHandler(async (req, res) => {
    // 1. Get local file path from multer

    const { userPreference } = req?.body;

    const localFilePath = req?.file?.path;


       const result = await createSnapNotesService(localFilePath, userPreference);


    // 4. Return response (In real app, you'd save result.url to DB here)

    const snapNotes = await createSnapNotesDAO(result.snapNotes, req.user._id, result.imageUrl);
    res.json({
        message: result.message,
        snapNotes
    });
});