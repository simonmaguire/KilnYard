import { IUser } from "../types/user";
import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "Users", timestamps: true }
);

export default model<IUser>("user", UserSchema);
