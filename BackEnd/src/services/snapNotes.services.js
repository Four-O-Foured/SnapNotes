import { ApiError } from "@google/genai";
import generateSnapNotes from "./ai.services.js";
import { uploadImageOnImageKit } from "../utils/imagekit.js";

export const createSnapNotesService = async (localFilePath, userPreference) => {
    if (!localFilePath) {
        throw new ApiError(400, "File is required")
    }

    // 2. Upload to ImageKit (Cleanup happens automatically inside utility)
    const { result, fileBuffer } = await uploadImageOnImageKit(localFilePath);

    if (!result) {
        throw new ApiError(500, "Failed to upload image to ImageKit");
    }

    const base64ImageData = Buffer.from(fileBuffer).toString('base64');
    
    // 3. Generate caption using AI
    const snapNotes = await generateSnapNotes(base64ImageData, userPreference);
    
    // 4. Return response (In real app, you'd save result.url to DB here)
    return {
        message: "SnapNotes generated successfully",
       snapNotes,
       imageUrl: result.url
    };
}