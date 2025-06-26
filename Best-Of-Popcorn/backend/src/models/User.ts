//DATABASE USER SCHEMA

import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "adminRole" | "actorRole" | "movieRole";
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username alanı boş geçilemez."],
      unique: true,
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "E-Posta alanı boş geçilemez."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Parola alanı boş geçilemez."],
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["adminRole", "actorRole", "movieRole"],
      default: "movieRole",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
