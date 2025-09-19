import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const jwtVerify = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json(new apiError(401, "Unauthorized: No token provided"));
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select("-password -refreshToken");

        req.user = user;
        next();
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return res.status(401).json(new apiError(401, "Unauthorized: Invalid token"));
    }
});

export { jwtVerify };