import { Document } from "mongoose";

export interface IImageData extends Document {
  public_id: string;
  secure_url: string;
  tags: string[];
  pot_ids: string;
}
