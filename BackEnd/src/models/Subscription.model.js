import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    plan: {
        type: String,
        enum: ["basic", "pro", "ultra"],
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);