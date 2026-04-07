import mongoose from "mongoose";

const userServiceDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true,
    },
    bookCreated: {
        type: Number,
        required: true,
        default: 0,
    },
    bookLimit: {
        type: Number,
        required: true,
    },
    listeningLimit: {
        type: Number,
        required: true,
    },
    totalListened: {
        type: Number,
        required: true,
        default: 0, // in Seconds
    }
}, {timestamps: true});

export const ServiceDetails = mongoose.model("ServiceDetails", userServiceDetailsSchema);