import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Register route
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

// Login route
router.route("/login").post(loginUser);

// Current user route
router.route("/details").get(verifyJWT, getCurrentUser);

// ---------------Secured routes-----------------
// Logout route
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
