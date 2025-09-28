import { User } from "../models/user.model.js";
import { sendEmail } from "../services/verifyEmail.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import bcrypt from "bcrypt";

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
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json(new apiError(400, "Please provide email and password"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(new apiError(404, "You are not registered. Please sign up first."));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(403).json(new apiError(403, "Invalid credentials - Password does not match"));
    }

    const adminEmails = [
      "admin@gmail.com",
      "ubaidali052@icloud.com",
      "nangyaluoa249@gmail.com"
    ];
    if (user?.role === 'admin' && !adminEmails.includes(user?.email)) { return res.status(404).json(new apiError(404, "You are not an admin!")); }

    await User.findByIdAndUpdate(user._id, { $set: { forgotPasswordOTP: null, forgotPasswordOTPExpiry: null, rememberMe } }, { new: true });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict", // recommended for CSRF protection
      maxAge: rememberMe
        ? 7 * 24 * 60 * 60 * 1000 // 7 days
        : 60 * 60 * 1000          // 1 hour
    };

    const data = await User.findById(user._id).select("-password -refreshToken");

    res.status(200)
      .cookie('refreshToken', refreshToken, cookieOptions)
      .cookie('accessToken', accessToken, cookieOptions)
      .json(new apiResponse(200, "Login successful", { user: data, accessToken, refreshToken }));
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json(new apiError(500, "Internal Server Error: Login failed"));
  }
});

const refreshToken = asyncHandler(async (req, res) => {
  try {
    // get token from cookie OR header
    const refreshTokenValue =
      req.cookies?.refreshToken ||
      req.headers?.authorization?.replace("Bearer ", "");

    if (!refreshTokenValue) {
      return res
        .status(401)
        .json(new apiError(401, "Unauthorized: No refresh token provided"));
    }

    // find user with this refresh token
    const user = await User.findOne({ refreshToken: refreshTokenValue });

    if (!user) {
      return res
        .status(403)
        .json(new apiError(403, "Forbidden: Invalid refresh token"));
    }

    // verify refresh token
    let decodedToken;
    try {
      decodedToken = jwt.verify(
        refreshTokenValue,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return res
        .status(403)
        .json(new apiError(403, "Unauthorized in Catch Block: Invalid refresh token"));
    }

    if (!decodedToken || decodedToken._id !== user._id.toString()) {
      return res
        .status(403)
        .json(new apiError(403, "Unauthorized Access: Invalid refresh token"));
    }

    // generate new tokens
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } = await generateAccessAndRefreshTokens(user._id);

    // update refreshToken in DB (important)
    user.refreshToken = newRefreshToken;
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict", // recommended for CSRF protection
    };

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .cookie("accessToken", newAccessToken, cookieOptions)
      .json(
        new apiResponse(200, "Token refreshed successfully", true, {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      );
  } catch (error) {
    console.error("Error during token refresh:", error);
    return res
      .status(500)
      .json(new apiError(500, "Internal Server Error: Token refresh failed"));
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // remove refreshToken from DB
    await User.findByIdAndUpdate(
      userId,
      { $set: { refreshToken: null } },
      { new: true }
    );

    // clear cookies from browser
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .status(200)
      .json(new apiResponse(200, "Logout successful", {}));
  } catch (error) {
    console.error("Error during logout:", error);
    res
      .status(500)
      .json(new apiError(500, "Internal Server Error: Logout failed"));
  }
});

const fetchAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");

    res.status(200).json(new apiResponse(200, "Users fetched successfully", users));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json(new apiError(500, "Internal Server Error: Fetching users failed"));
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json(new apiError(400, "Status is required"));
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json(new apiError(404, "User not found"));
  }

  user.status = status;
  await user.save();

  res.status(200).json(new apiResponse(200, "User status changed successfully", { id: user._id, status: user.status }));
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(
          new apiError(
            400,
            'Email is required',
          )
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(
          new apiError(
            404,
            'Email not found. please enter a valid email',
          )
        );
    }

    const opt = Math.floor(100000 + Math.random() * 900000);

    const otpExpiryTime = Date.now() + 60 * 60 * 1000;

    const otpStandardTime = new Date(otpExpiryTime).toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      timezone: 'IST',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });


    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          forgotPasswordOTP: opt,
          forgotPasswordOTPExpiry: otpExpiryTime,
        },
      },
      {
        new: true,
        runValidators: true, // to ensure that the updated data meets the schema validation
      }
    ).select('-password -refreshToken');

    await sendEmail({
      sendTo: user.email,
      subject: 'Forgot Password OTP',
      html: verifyEmailTemplate({
        name: user.username,
        otp: opt,
        otpExpiryTime: otpStandardTime,
      }),
    });

    return res.status(200).json(
      new apiResponse(
        200,
        'OTP sent to your email successfully',
        {
          user: updatedUser,
          otp: opt,
          otpExpiryTime: otpStandardTime,
        },
        true
      )
    );
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res
      .status(500)
      .json(
        new apiError(
          500,
          'Internal Server Error: Failed to send OTP',
        )
      );
  }
});

const forgotPasswordOTPVerification = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json(
          new apiError(
            400,
            'Email and OTP is required',
          )
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(
          new apiError(
            404,
            'Email not found',
          )
        );
    }

    if (user.forgotPasswordOTP !== otp) {
      return res
        .status(400)
        .json(
          new apiError(400, 'Invalid OTP')
        );
    }

    const expiryStandardTime = new Date(user.forgotPasswordOTPExpiry).toLocaleString('eng-US', {
      timeZone: 'Asia/Karachi',
      timezone: 'IST',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });


    if (new Date() > user.forgotPasswordOTPExpiry) {
      return res
        .status(400)
        .json(
          new apiError(
            400,
            `OTP expired at ${expiryStandardTime}. Please request a new OTP.`
          )
        );
    }

    return res.status(200).json(
      new apiResponse(
        200,
        'OTP verified successfully',
        {
          user: {
            _id: user._id,
            name: user.username,
            email: user.email,
            mobile: user.mobile,
          },
          otpExpiryTime: expiryStandardTime,
        }
      )
    );
  } catch (error) {
    console.error('Error in forgotPasswordOTPVerification:', error);
    return res
      .status(500)
      .json(
        new apiError(
          500,
          'Internal Server Error, OTP Verification Failed',
        )
      );
  }
});

const resetPassword = asyncHandler(async (req, res) => {

  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json(
          new apiError(
            400,
            'Email, New Password, and Confirm Password are required',
          )
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(
          new apiError(
            404,
            'Email not found',
          )
        );
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json(
          new apiError(
            400,
            'New Password and Confirm Password do not match',
          )
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          password: hashedPassword,
          forgotPasswordOTP: null, // clear the OTP after password reset
          forgotPasswordOTPExpiry: null, // clear the OTP expiry time after password reset
        },
      },
      {
        new: true,
        runValidators: true, // to ensure that the updated data meets the schema validation
      }
    ).select('-password -refreshToken');

    return res.status(200).json(
      new apiResponse(
        200,
        'Password reset successfully',
        {
          user: {
            _id: user._id,
            name: user.username,
            email: user.email,
            mobile: user.mobile,
          },
        },
        true
      )
    );
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return res
      .status(500)
      .json(
        new apiError(
          500,
        )
      );
  }
});





export { register, login, logout, refreshToken, fetchAllUsers, updateStatus, forgotPassword, forgotPasswordOTPVerification, resetPassword };