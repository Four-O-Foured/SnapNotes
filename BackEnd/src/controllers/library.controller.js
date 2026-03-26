import { asyncHandler } from "../utils/asyncHandler.js";
import { addBookService } from "../services/library.services.js";


export const addBooks = asyncHandler(async (req, res) => {
    const book = await addBookService(req);
    res.status(201).json({ message: "Book added successfully", book });
})

