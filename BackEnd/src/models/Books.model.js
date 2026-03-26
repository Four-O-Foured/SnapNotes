import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    coverImageUrl: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    persona: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Thriller", "Romance", "Horror", "Historical Fiction", "Biography", "Autobiography", "Self-Help", "Business", "Technology", "Health", "Education", "Children", "Young Adult", "Poetry", "Drama", "Other"],
        index: true
    },
    totalSegments: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });


const Book = mongoose.model("Books", bookSchema);

export default Book;