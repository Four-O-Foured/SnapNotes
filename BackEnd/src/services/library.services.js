import { uploadImageOnImageKit } from "../utils/imagekit.js";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { generateSlug, parsePDFFile } from "../utils/helper.js";
import { ApiError } from "../utils/ApiError.js";
import { createBook, getBookBySlug, getBookByTitle, insertBookSegments, deleteBook, deleteBookSegments } from "../DAO/library.dao.js";

export const addBookSegments = async (user, bookId, segments) => {
    try {

        const segmentsToInsert = segments.map(({ text, segmentIndex, pageNumber, wordCount }) => ({
            content: text,
            segmentIndex,
            pageNumber,
            wordCount,
            bookId,
            user
        }));

        const bookSegments = await insertBookSegments(segmentsToInsert);

        return { message: "Book segments added successfully", bookSegments };
    } catch (error) {
        await deleteBookSegments(bookId);
        await deleteBook(bookId);
        throw new ApiError(500, "Failed to add book segments");
    }
}

export const addBookService = async (req) => {
    const { author, category, persona } = req.body;
    let { title } = req.body;
    title = title.trim().replace(/[\s_]+/g, '-').toLowerCase();

    const existingBookByTitle = await getBookByTitle(title);
    if (existingBookByTitle) {
        throw new ApiError(400, "Book already exists");
    }
    const user = req.user._id;

    if (!req.files?.pdf) {
        throw new ApiError(400, "PDF file is required");
    }

    const hasCoverImage = !!req.files?.coverImage;

    const slug = generateSlug(title);

    const existingBook = await getBookBySlug(slug);

    if (existingBook) {
        throw new ApiError(400, "Book already exists");
    }

    const pdfLocalPath = req.files.pdf[0].path;

    const fileBuffer = await fs.readFile(pdfLocalPath);

    let coverImageLocalPath = hasCoverImage ? req.files.coverImage[0].path : null;

    // Always parse the PDF for its text segments! Only generate cover if missing.
    const { coverBuffer, content: segments } = await parsePDFFile(fileBuffer, !hasCoverImage);

    // Fallback if no cover image is provided, parse the PDF to extract one
    if (!hasCoverImage) {
        if (!coverBuffer) {
            throw new ApiError(500, "Failed to generate cover image from PDF");
        }
        // Write generated cover buffer to temp file so ImageKit can upload it
        coverImageLocalPath = path.join(os.tmpdir(), `cover-${Date.now()}.png`);
        await fs.writeFile(coverImageLocalPath, coverBuffer);
    }

    // Run both uploads concurrently
    const [pdfUpload, coverImageUpload] = await Promise.all([
        uploadImageOnImageKit(pdfLocalPath, "Books"),
        uploadImageOnImageKit(coverImageLocalPath, "BookCovers")
    ]);

    if (!pdfUpload?.result || !coverImageUpload?.result) {
        throw new ApiError(500, "Failed to upload files");
    }


    const book = await createBook({
        title,
        author,
        category,
        persona,
        slug,
        coverImageUrl: coverImageUpload.result.url,
        fileUrl: pdfUpload.result.url,
        user
    });

    await addBookSegments(user, book._id, segments);

    return book;

}