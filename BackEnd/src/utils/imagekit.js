import ImageKit from "@imagekit/nodejs";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY_IK,
    privateKey: process.env.PRIVATE_KEY_IK,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

/**
 * Uploads a local file to ImageKit and deletes the local copy.
 * @param {string} localFilePath - Path to the file on disk.
 * @returns {Promise<object|null>} ImageKit response or null if failed.
 */
export const uploadImageOnImageKit = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Read file from disk
        const fileBuffer = await fs.readFile(localFilePath);
        const fileName = path.basename(localFilePath);

        // Upload to ImageKit
        const result = await imagekit.files.upload({
            file: fileBuffer.toString("base64"),
            fileName: fileName,
            folder: "posts",
        });

        // Cleanup local file after success
        await fs.unlink(localFilePath);
        return {result, fileBuffer};

    } catch (error) {
        // Cleanup local file even on failure
        try {
            if (localFilePath) await fs.unlink(localFilePath);
        } catch (unlinkError) {
            console.error("Failed to delete local file:", unlinkError);
        }
        console.error("ImageKit Upload Error:", error);
        return null;
    }
};
