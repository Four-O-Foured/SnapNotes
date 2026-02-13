import UserModel from "../models/user.Model.js";

export const createUser = async (username, email, password) => {
    return await UserModel.create({ username, email, password });
}

export const findUserById = async (id) => {
    return await UserModel.findById(id);
}

export const findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
}
export const emailSelectPasswordFind = async (email) => {
    return await UserModel.findOne({ email }).select("+password");
}