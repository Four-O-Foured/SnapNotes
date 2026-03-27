import { createUser, emailSelectPasswordFind, findUserByEmail } from "../DAO/user.dao.js";
import { ApiError } from "../utils/ApiError.js";
import { comparePassword, generateAccessToken } from "../utils/helper.js";
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';  

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUserService = async (username, email, password) => {
    const findUser = await findUserByEmail(email);
    if (findUser) {
        throw new ApiError(409, "User already exists");
    }
    const user = await createUser(username, email, password);
    const accessToken = generateAccessToken(user._id);

    return { user, accessToken };
}

export const googleAuthService = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await findUserByEmail(email);

        if (!user) {
            // Auto-register the user if they don't exist
            // Generate a secure, unguessable random password since Google handles auth
            const randomPassword = crypto.randomBytes(32).toString('hex');
            user = await createUser(name, email, randomPassword);
        }

        const accessToken = generateAccessToken(user._id);
        return { user, accessToken };
    } catch (error) {
        throw new ApiError(401, "Invalid Google Token");
    }
}

export const loginUserService = async (email, password, rememberMe = false) => {
    const findUser = await emailSelectPasswordFind(email);
    if (!findUser) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await comparePassword(findUser.password, password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credentials");
    }
    
    const accessToken = generateAccessToken(findUser._id, rememberMe);

    return { user: findUser, accessToken };
}