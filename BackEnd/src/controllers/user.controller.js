import { asyncHandler } from "../utils/asyncHandler.js";
import { loginUserService, registerUserService } from "../services/user.services.js";
import { ApiError } from "../utils/ApiError.js";
import { cookieOptions } from "../utils/helper.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const { user, accessToken } = await registerUserService(username, email, password);
    res.cookie("accessToken", accessToken, cookieOptions);
    res.json({ message: "User registered successfully", user, accessToken });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    
    const { user, accessToken } = await loginUserService(email, password);
    res.cookie("accessToken", accessToken, cookieOptions);
    res.json({ message: "User logged in successfully", user, accessToken });
});
