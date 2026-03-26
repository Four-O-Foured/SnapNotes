import Book from "../models/Books.model.js";
import BookSegmentsModel from "../models/BookSegments.model.js";

export const getBookBySlug = async (slug) => {
    return await Book.findOne({ slug }).lean();
}

export const getBookByTitle = async (title) => {
    return await Book.findOne({ title }).lean();
}

export const createBook = async (bookData) => {
    return await Book.create(bookData);
}

export const createBookSegments = async (bookSegmentsData) => {
    return await BookSegmentsModel.insertMany(bookSegmentsData);
}

export const deleteBookSegments = async (bookId) => {
    return await BookSegmentsModel.deleteMany({ bookId });
}

export const deleteBook = async (bookId) => {
    return await Book.findByIdAndDelete(bookId);
}

export const insertBookSegments = async (bookSegmentsData) => {
    const bookSegments = await BookSegmentsModel.insertMany(bookSegmentsData);
    await Book.findByIdAndUpdate(bookSegmentsData[0].bookId, { $inc: { totalSegments: bookSegments.length } });
    return bookSegments;
}

