// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
// const jwt = require("jsonwebtoken");
import jsonwebtoken from "jsonwebtoken";
import UserSchema from "../models/UserSchema";
import { NextFunction, Request, Response } from "express";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    let takenUser = await UserSchema.findOne({ username: user.username });
    takenUser = takenUser ?? (await UserSchema.findOne({ email: user.email }));

    if (takenUser) {
      res.json({
        message: "Username or email has already been taken",
      });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      const dbUser = new UserSchema({
        username: user.username,
        email: user.email.toLowerCase(),
        password: user.password,
      });
      dbUser.save().then((savedDoc) => {
        req.body.userId = savedDoc._id;
        req.body.username = savedDoc.username;

        next();
      });
    }
  } catch (error) {
    throw error;
  }
};

const verifyLoginInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;

    UserSchema.findOne({ username: user.username }).then((dbUser) => {
      if (!dbUser) {
        return res
          .json({
            message: "Invalid Username",
          })
          .send();
      }
      bcrypt
        .compare(user.password, dbUser.password)
        .then((isCorrect: boolean) => {
          if (!isCorrect) {
            return res
              .json({
                message: "Invalid Username or Password",
              })
              .send();
          } else {
            req.body.userId = dbUser._id;
            req.body.username = dbUser.username;
            next();
          }
        });
    });
  } catch (error) {
    throw error;
  }
};
type TokenType = { id: string; username: string };

const login = async (req: Request, res: Response) => {
  const dbUser = { userId: req.body.userId, username: req.body.username };

  jsonwebtoken.sign(
    {
      id: dbUser.userId,
      username: dbUser.username,
    },
    process.env.JWT_SECRET || "",
    { expiresIn: "12h" },
    (err: any, token: any) => {
      if (err) return res.json({ message: err });
      console.log(token);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({
          message: "login successful",
          user: {
            id: dbUser.userId,
            username: dbUser.username,
          },
        });
    }
  );
};

const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.json({ message: "No Token Given", isLoggedIn: false });
  }
  if (!process.env.JWT_SECRET) {
    return res.json({
      message: "environment incorrectly set up",
      isLoggedIn: false,
    });
  }

  try {
    jsonwebtoken.verify(
      accessToken,
      process.env.JWT_SECRET,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            isLoggedIn: false,
            message: "Failed To Authenticate",
          });
        }
        req.body.userId = decoded.id;
        req.body.username = decoded.username;

        next();
      }
    );
  } catch {
    return res
      .sendStatus(403)
      .json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

export { registerUser, login, verifyUserToken, verifyLoginInfo };
