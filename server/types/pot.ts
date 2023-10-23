import { Document } from "mongoose";

export interface IPot extends Document {
  stage?: string;
  clay?: string;
  name?: string;
  category?: string;
  clay_weight?: string;
  throwing_height?: string;
  throwing_width?: string;
  throwing_notes?: string;
  throwing_pic_ids?: string[];
  green_decorations?: string;
  trim_notes?: string;
  glazes?: string;
  glaze_notes?: string;
  result_height?: string;
  result_width?: string;
  result_notes?: string;
  result_pic_ids?: string[];
  throwing_date?: Date;
  trim_date?: Date;
  result_date?: Date;
  userId: String;
}
