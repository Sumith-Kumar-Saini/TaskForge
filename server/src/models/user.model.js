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
    passwordHash: { type: String, select: false },
    avatarURL: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/, "Invalid avatar URL"],
    },
  },
  { timestamps: true, versionKey: false }
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

  // Validate password strength
  if (this._password.length < 8) {
    return next(new Error("Password must be at least 8 characters long"));
  }

  if (this.isModified("passwordHash") || this._password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.passwordHash = await bcrypt.hash(this._password, salt);
  }

  next();
});

// Instance method to verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  // Ensure passwordHash is loaded
  if (!this.passwordHash)
    throw new Error(
      "Password hash not loaded. Use .select('+passwordHash') when querying."
    );
  return bcrypt.compare(enteredPassword, this.passwordHash);
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.passwordHash;
  return userObject;
};

const User = mongoose.models.User || model("User", userSchema);

export default User;
