// import { isUserAuth } from "src/pottery-web-app/src/API";
import {
  getPots,
  createPot,
  getPot,
  deletePot,
  updatePot,
} from "../controllers/PotteryController";
import { verifyUserToken } from "../controllers/UserController";
import express from "express";
import multer from "multer";

const potteryRouter = express.Router();

// const multer = require("multer");
const upload = multer({ dest: "./src/server/uploads/" });

potteryRouter.get("/pots", verifyUserToken, getPots);

potteryRouter.get("/pots/:id", verifyUserToken, getPot);

potteryRouter.post(
  "/create-pot",
  upload.fields([
    { name: "throwing_pics", maxCount: 5 },
    { name: "result_pics", maxCount: 5 },
  ]),
  verifyUserToken,
  createPot
);

potteryRouter.put(
  "/update-pot/:id",
  upload.fields([
    { name: "throwing_pics", maxCount: 5 },
    { name: "result_pics", maxCount: 5 },
  ]),
  verifyUserToken,
  updatePot
);

potteryRouter.delete("/delete-pot/:id", verifyUserToken, deletePot);

export default potteryRouter;
