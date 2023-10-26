import { Request, Response } from "express";
import {
  registerUser,
  login,
  verifyUserToken,
  verifyLoginInfo,
} from "../controllers/UserController";
import express from "express";

// const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", registerUser, login);

userRouter.post("/login", verifyLoginInfo, login);

userRouter.get("/logout", verifyUserToken, (req: Request, res: Response) => {
  return res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      message:
        "Success                                                                                                                                                                                                                                                                                                                           ully logged out 😏 🍀",
    });
});

userRouter.get(
  "/isUserAuth",
  verifyUserToken,
  (req: Request, res: Response) => {
    return res.json({
      isLoggedIn: true,
      username: req.body.username,
      userId: req.body.userId,
    });
  }
);

export default userRouter;
