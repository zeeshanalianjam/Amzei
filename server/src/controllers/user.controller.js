import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async userId => {
    try {
        const user = await User.findById(userId);
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
        
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Token generation failed", error.message);
    }
}

const register = asyncHandler(async (req, res) => {
    try {
        const { username, email, phone, password, termsConditions } = req.body;

        if (!username || !email || !phone || !password || !termsConditions) {
            return res.status(400).json(new apiError(400, "Please fill all required fields"));
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json(new apiError(400, 'Please enter a valid email address'));
        }

        if (!/^(?:\+971|0)(?:2|3|4|6|7|9|5[024568])\d{7}$/.test(phone)) {
            return res.status(400).json(new apiError(400, "Please enter a valid UAE phone number"));
        }

        if (username.length < 3) {
            return res.status(400).json(new apiError(400, "Username must be at least 3 characters long"));
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json(new apiError(400, "Email already exists"));
        }

        if (password.length < 6) {
            return res.status(400).json(new apiError(400, "Password must be at least 6 characters long"));
        }

        if (!termsConditions) {
            return res.status(400).json(new apiError(400, "You must accept the terms and conditions"));
        }

        const newUser = await User.create({
            username,
            email,
            phone,
            password,
            termsConditions,
        });

        const data = await User.findById(newUser._id).select("-password -refreshToken");

        return res.status(201).json(new apiResponse(201, "You are registered successfully", true, data));

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json(new apiError(500, "Internal Server Error: Registration failed"));
    }
});


const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json(new apiError(400, "Please provide email and password"));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json( new apiError(404, "You are not registered. Please sign up first."));
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json( new apiError(401, "Invalid credentials - Password does not match"));
        }

        await User.findByIdAndUpdate(user._id, { $set: { forgotPasswordOTP: null, forgotPasswordOTPExpiry: null } }, { new: true });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
        };

        const data = await User.findById(user._id).select("-password -refreshToken");

        res.status(200)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .cookie('accessToken', accessToken, cookieOptions)
        .json(new apiResponse(200, "Login successful", true, { user: data, accessToken, refreshToken }));
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Login failed"));
    }
});


const logout = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        await User.findByIdAndUpdate(userId, { $set: { refreshToken: null, accessToken: null } }, { new: true });

        res.status(200).json(new apiResponse(200, "Logout successful", true));
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Logout failed"));
    }
});

export { register, login, logout };