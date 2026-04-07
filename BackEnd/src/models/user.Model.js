import mongoose from "mongoose";
import { comparePassword, hashPassword, options } from "../utils/helper.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        default: null,
    },
    serviceDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserServiceDetails",
        default: null,
    }
}, { timestamps: true, toJSON: options, toObject: options });

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(this.password, password);
}

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await hashPassword(this.password);
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

