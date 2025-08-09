import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { ENV } from "../config/env.js";

const { BCRYPT_SALT_ROUNDS: SALT_ROUNDS } = ENV;

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: { type: String, required: true, select: false },
    avatarURL: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/, "Invalid avatar URL"],
    },
  },
  { timestamps: true, versionKey: false }
);

// Pre-save hook for hashing
userSchema.pre("save", async function (next) {
  if (!this.password) return next();
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.passwordHash;
  return userObject;
};

const User = mongoose.models.User || model("User", userSchema);

export default User;
