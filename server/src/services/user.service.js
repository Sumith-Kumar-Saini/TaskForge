import User from "../models/user.model.js";

export async function createUser({ username, email, password }) {
  const user = new User({ username, email, password });
  await user.save(); // in future we would add JWT ID
  return user;
}

export async function verifyUserPassword({ email, candidatePassword }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await user.comparePassword({ candidatePassword });
  if (!isMatch) throw new Error("Incorrect password");

  return user;
}

/**
 * Finds a user by username or email.
 *
 * Usage:
 * - Registration: to check if username or email is already taken.
 * - Login: to verify that a username/email exists before password check.
 * - Other checks: when needing to fetch a user by username/email for any logic.
 *
 * Returns:
 * - null if no match.
 * - { username, email, _id } if a user is found.
 *
 * @param {Object} params
 * @param {string} [params.username] - Username to search for.
 * @param {string} [params.email] - Email to search for.
 */
export async function checkUserExist({ username, email }) {
  try {
    const query = [];
    if (username) query.push({ username });
    if (email) query.push({ email });

    if (query.length === 0) {
      throw new Error("checkUserExist requires at least username or email");
    }

    const user = await User.findOne(
      { $or: query },
      { username: 1, email: 1, _id: 1 }
    ).lean();

    return user || null;
  } catch (error) {
    logger.error("Error in checkUserExist", { error: error.message });
    throw new Error("INTERNAL_SERVER_ERROR");
  }
}
