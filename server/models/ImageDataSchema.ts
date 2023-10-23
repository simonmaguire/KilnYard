import { IImageData } from "../types/imageData";
import { model, Schema } from "mongoose";

const ImageDataSchema: Schema = new Schema(
  {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    pot_id: {
      type: String,

      required: true,
    },
  },
  { collection: "Images", timestamps: true }
);

export default model<IImageData>("imageData", ImageDataSchema);
