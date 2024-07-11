import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import {
  ApiResponse,
  apiResponseWithStatusCode,
} from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken, user };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    return apiResponseWithStatusCode(res, 400, "All fields are required");
  }

  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    return apiResponseWithStatusCode(
      res,
      409,
      "User with email already exists"
    );
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  const user = await User.create({
    fullName,
    avatar: avatar?.url || "",
    email,
    password,
  });

  const creaedUser = await User.findById(user._id).select(
    "-_id -__v -password -refreshToken"
  );

  if (!creaedUser) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while registering user"
    );
  }
  console.log("register");
  return apiResponseWithStatusCode(
    res,
    200,
    "User registered successfully!!",
    creaedUser
  );
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  if (!email) {
    return apiResponseWithStatusCode(res, 400, "Email is required");
  }

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return apiResponseWithStatusCode(res, 404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return apiResponseWithStatusCode(res, 401, "Incorrect password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "Logged in successfully!!"
      )
    );
});

// Log out the user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  ).selected("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully!!"));
});

export { registerUser, loginUser, logoutUser };
