import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import logger from "../utils/winstonLogger.js";

/**
 * @typedef {Object} CreateUserInput
 * @property {string} username - Username
 * @property {string} email - email
 * @property {string} password - password
 */

/**
 * Creates a new user
 * @param { CreateUserInput } param
 * @returns { Promise<import("../types/user.js").IUser> } - new entry of User
 */
export async function createUser({ username, email, password }) {
  const user = new User({ username, email, password });
  await user.save(); // in future we would add JWT ID
  return user;
}

/**
 * Verifies a user's password against its hashed value
 * @param { string } [password] - Password
 * @param { string } [hash] - Password hash
 * @returns {Promise<boolean>}
 */
export async function verifyUserPassword({ password, hash }) {
  if (typeof password !== "string" || typeof hash !== "string") {
    logger.warn("verifyUserPassword called with invalid arguments", {
      passwordProvided: typeof password === "string",
      hashProvided: typeof hash === "string",
    });
    return false; // fail gracefully instead of crashing
  }

  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    logger.error("Error comparing passwords", { error: err.message });
    return false;
  }
}

/**
 * Finds a user by username or email.
 * @param { Object } params0
 * @param { string } [params0.username] - Username to search for.
 * @param { string } [params0.email] - Email to search for.
 * @param { Object } param1
 * @param { boolean } [param1.password=false] - options
 * @param { boolean } [param1.fullDoc=false] - options
 * @returns { Promise<import("../types/user.js").IUser | null> }
 */
export async function checkUserExist(
  { username, email },
  { password = false, fullDoc = false }
) {
  try {
    const query = [];
    if (username) query.push({ username });
    if (email) query.push({ email });

    if (query.length === 0) {
      throw new Error("checkUserExist requires at least username or email");
    }

    const selectFields = [
      "username",
      "email",
      "_id",
      password ? "password" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const user = await User.findOne({ $or: query }).select(selectFields).lean(); // Lean automatically returns plain JS objects

    if (user) {
      user.removeFields = (fields) => {
        const fieldsArray = fields.split(" ");
        fieldsArray.forEach((field) => {
          delete user[field];
        });
        return user;
      };
    }

    return user || null;
  } catch (error) {
    logger.error("Error in checkUserExist", { error: error.message });
    throw new Error("INTERNAL_SERVER_ERROR");
  }
}
