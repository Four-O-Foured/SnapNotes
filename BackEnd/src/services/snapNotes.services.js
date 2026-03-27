import { ApiError } from "../utils/ApiError.js";
import generateSnapNotes from "./ai.services.js";
import { uploadImageOnImageKit } from "../utils/imagekit.js";
import fs from "fs/promises";

export const createSnapNotesService = async (localFiles, userPreference) => {
    if (!localFiles || localFiles.length === 0) {
        throw new ApiError(400, "At least one file is required")
    }

    try {
        // 2. Upload all to ImageKit
        const uploadPromises = localFiles.map(f => uploadImageOnImageKit(f.path));
        const uploadResults = await Promise.all(uploadPromises);

        const imageUrls = [];
        const base64ImageDataArray = [];

        for (let i = 0; i < uploadResults.length; i++) {
            if (!uploadResults[i]) {
                throw new ApiError(500, "Failed to upload one or more images to ImageKit");
            }
            const { result, fileBuffer } = uploadResults[i];
            if (!result) {
                throw new ApiError(500, "Failed to upload one or more images to ImageKit");
            }
            imageUrls.push(result.url);
            base64ImageDataArray.push({
                mimeType: localFiles[i].mimetype || localFiles[i].mimeType,
                data: Buffer.from(fileBuffer).toString('base64')
            });
        }
        
        // 3. Generate caption using AI
        const snapNotes = await generateSnapNotes(base64ImageDataArray, userPreference);
        
        // 4. Return response (In real app, you'd save result.url to DB here)
        return {
            message: "SnapNotes generated successfully",
            snapNotes,
            imageUrls
        };
    } finally {
        // Guarantee cleanup of Multer temp files
        for (const file of localFiles) {
            if (file.path) {
                try {
                    await fs.unlink(file.path);
                } catch (e) {
                    // Ignore error if file is already deleted by imagekit utility
                }
            }
        }
    }
}