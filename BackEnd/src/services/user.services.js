import { createUser, emailSelectPasswordFind, findUserByEmail } from "../DAO/user.dao.js";
import { ApiError } from "../utils/ApiError.js";
import { comparePassword, generateAccessToken } from "../utils/helper.js";

export const registerUserService = async (username, email, password) => {
    const findUser = await findUserByEmail(email);
    if (findUser) {
        throw new ApiError(409, "User already exists");
    }
    const user = await createUser(username, email, password);
    const accessToken = generateAccessToken(user._id);

    return { user, accessToken };
}

export const loginUserService = async (email, password) => {
    const findUser = await emailSelectPasswordFind(email);
    if (!findUser) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await comparePassword(findUser.password, password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credentials");
    }
    
    const accessToken = generateAccessToken(findUser._id);

    return { user: findUser, accessToken };
}