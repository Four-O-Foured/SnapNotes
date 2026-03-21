import mongoose from "mongoose";
import UserModel from "../models/user.Model.js";

const snapNotesSchema = new mongoose.Schema({
    images: {
        type: [String],
        default: []
    },
    snapNotes: {
        type: Object,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    }
}, { 
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        }
    }, 
    toObject: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        }
    } 
})

const SnapNotesModel = mongoose.model("SnapNotes", snapNotesSchema);

export default SnapNotesModel;


