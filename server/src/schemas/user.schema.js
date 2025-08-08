// models/user.model.js
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

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
    passwordHash: { type: String, required: true, select: false },
    avatarURL: String,
  },
  { timestamps: true }
);

// Virtual field for plain password (not stored in DB)
userSchema
  .virtual("password")
  .set(function (value) {
    this._password = value;
  })
  .get(function () {
    return this._password;
  });

// Pre-save hook for hashing
userSchema.pre("save", async function (next) {
  if (!this._password) return next();
  if (!this.isModified("_password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.passwordHash = await bcrypt.hash(this._password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.passwordHash);
};

export default userSchema;
