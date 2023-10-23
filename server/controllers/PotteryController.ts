import { Request, Response } from "express";
import { IPot } from "./../types/pot";
import { SortOrder, isValidObjectId } from "mongoose";
import QueryString from "qs";
import {
  deleteImage,
  uploadImagesBySection,
} from "../middleware/cloudinaryHelpers";
import { unlink } from "fs";
import PotterySchema from "../models/PotterySchema";
import ImageDataSchema from "../models/ImageDataSchema";
import "multer";

type MulterObjectForImageSections = {
  throwing_pics: Express.Multer.File[];
  result_pics: Express.Multer.File[];
};

interface IPotteryQueryObject {
  userId: string;
  stage?: string;
  category?: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[];
}

interface ISortedByObject {
  text: string;
  field: string;
  direction: number;
}

const getPots = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isValidObjectId(req.body.userId)) {
      let queryObj: IPotteryQueryObject = { userId: req.body.userId };

      if (req.query.stage) {
        queryObj.stage = req.query.stage.toString();
      }
      if (req.query.potType) {
        queryObj.category = req.query.potType;
      }

      let sort: { field: string; direction: SortOrder } = {
        field: "createdAt",
        direction: -1,
      };

      if (req.query.sortedBy && req.query.sortDirection !== undefined) {
        sort.field = req.query.sortedBy.toString();
        sort.direction = req.query.sortDirection.toString() as SortOrder;
      }

      let skip = req.query.page?.toString()
        ? (parseInt(req.query.page.toString()) - 1) * 20
        : 0;

      const pots: IPot[] = await PotterySchema.find(queryObj)
        .limit(20)
        .skip(skip)
        .sort({
          [sort.field]: sort.direction,
        });

      console.log(sort);

      const potCountFiltered: number = await PotterySchema.find(
        queryObj
      ).count();
      res.status(200).json({ pots, potCountFiltered });
    }
  } catch (error) {
    throw error;
  }
};

const getPot = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isValidObjectId(req.params.id)) {
      const pot: IPot | null = await PotterySchema.findById(req.params.id);
      res.status(200).json({ pot });
    }
  } catch (error) {
    throw error;
  }
};

const createPot = async (req: Request, res: Response) => {
  try {
    const { body, files } = req;

    const pot: IPot = new PotterySchema({
      stage: body.stage,
      clay: body.clay,
      name: body.name,
      category: body.category,
      clay_weight: body.clay_weight,
      throwing_height: body.throwing_height,
      throwing_width: body.throwing_width,
      throwing_notes: body.throwing_notes,
      green_decorations: body.green_decorations,
      trim_notes: body.trim_notes,
      glazes: body.glazes,
      glaze_notes: body.glaze_notes,
      result_height: body.result_height,
      result_width: body.result_width,
      result_notes: body.result_notes,
      throwing_date: body.throwing_date,
      trim_date: body.trim_date,
      result_date: body.result_date,
      userId: body.userId,
    });

    const newPot: IPot = await pot.save();

    if (files) {
      if (Array.isArray(files)) {
        throw Error;
      }
      let filesObject: MulterObjectForImageSections = {
        throwing_pics: files["throwing_pics"],
        result_pics: files["result_pics"],
      };
      await uploadImagesBySection(filesObject, newPot._id).then((ids) => {
        newPot.throwing_pic_ids = ids["throwingPicIds"];
        newPot.result_pic_ids = ids["resultPicIds"];
      });
      removeUploadsFromLocal(filesObject);

      await newPot.save();
    }

    res.status(201).json({ message: "Pot added", pot: newPot });
  } catch (error) {
    console.log("No way");
    throw error;
  }
};

const removeUploadsFromLocal = (filesObject: MulterObjectForImageSections) => {
  //TODO is error always printed?
  if (filesObject["throwing_pics"]) {
    filesObject["throwing_pics"].forEach((file) =>
      unlink(file.path, (error) => console.log("check"))
    );
  }
  if (filesObject["result_pics"]) {
    filesObject["result_pics"].forEach((file) =>
      unlink(file.path, (error) => console.log("check3"))
    );
  }
};

const updatePot = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
      files,
    } = req;

    ///////////////////////// turn into helper? 8 lines -> 2
    let throwingIdsAsArray: string[] = [];
    let resultIdsAsArray: string[] = [];
    if (body["throwing_pic_ids"]) {
      throwingIdsAsArray = Array.isArray(body["throwing_pic_ids"])
        ? body["throwing_pic_ids"]
        : [body["throwing_pic_ids"]];
    }
    if (body["result_pic_ids"]) {
      resultIdsAsArray = Array.isArray(body["result_pic_ids"])
        ? body["result_pic_ids"]
        : [body["result_pic_ids"]];
    }
    /////////////////////////////////

    //turn into helper func?
    if (files) {
      if (Array.isArray(files)) {
        throw Error;
      }
      let filesObject: MulterObjectForImageSections = {
        throwing_pics: files["throwing_pics"],
        result_pics: files["result_pics"],
      };

      await uploadImagesBySection(filesObject, body._id).then(
        (ids: { throwingPicIds: string[]; resultPicIds: string[] }) => {
          throwingIdsAsArray = throwingIdsAsArray
            ? throwingIdsAsArray.concat(ids["throwingPicIds"])
            : ids["throwingPicIds"];
          resultIdsAsArray = resultIdsAsArray
            ? resultIdsAsArray.concat(ids["resultPicIds"])
            : ids["resultPicIds"];
        }
      );
      removeUploadsFromLocal(filesObject);
    }

    const savedImageData = await ImageDataSchema.find(
      { pot_id: id },
      "public_id"
    );

    let removedImageIds = [];
    for (let i = 0; i < savedImageData.length; i++) {
      let indexOfId = throwingIdsAsArray.indexOf(savedImageData[i].public_id);
      if (indexOfId === -1) {
        indexOfId = resultIdsAsArray.indexOf(savedImageData[i].public_id);
        if (indexOfId === -1) {
          removedImageIds.push(savedImageData[i].public_id);
        }
      }
    }

    removedImageIds.forEach((id_to_delete) => deleteImage(id_to_delete));

    body["throwing_pic_ids"] = throwingIdsAsArray;
    body["result_pic_ids"] = resultIdsAsArray;

    const updatedPot: IPot | null = await PotterySchema.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true }
    );

    res.status(200).json({
      message: "Pot updated",
      pot: updatedPot,
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deletePot = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPot: IPot | null = await PotterySchema.findByIdAndRemove(
      req.params.id
    );

    if (deletedPot?.throwing_pic_ids) {
      deletedPot.throwing_pic_ids.forEach((id) => deleteImage(id));
    }

    res.status(200).json({
      message: "Pot deleted",
      pot: deletedPot,
    });
  } catch (error) {
    throw error;
  }
};

export { getPots, createPot, getPot, updatePot, deletePot };
