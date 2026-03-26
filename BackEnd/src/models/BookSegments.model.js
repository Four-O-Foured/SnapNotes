import mongoose from "mongoose";

const bookSegmentsSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
        required: true,
    },
    segmentIndex: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    pageNumber: {
        type: Number,
        required: true
    },
    wordCount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

bookSegmentsSchema.index({ bookId: 1, segmentIndex: 1 }, { unique: true });
bookSegmentsSchema.index({ bookId: 1, pageNumber: 1 });
bookSegmentsSchema.index({ bookId: 1, content: "text" });

const BookSegmentsModel = mongoose.model("BookSegments", bookSegmentsSchema);

export default BookSegmentsModel;
