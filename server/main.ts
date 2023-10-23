import { Express, NextFunction, Request, Response } from "express";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRoutes";
import potteryRouter from "./routes/PotteryRoutes";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Connect Database
connectDB();

//Cloudinary
cloudinary.config({ secure: true });

//Routes
// const potteryRoutes = require("./routes/PotteryRoutes");
// const userRoutes = require("./routes/UserRoutes");
// import {userRouter} from ".routes/UserRoutes";
app.use(userRouter);
app.use(potteryRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
