import User from "../models/user.model.js";

export async function createUser({ name, email, password }) {
  const user = new User({ name, email, password });
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

export async function checkUserExist({ username, email }) {
  const user = await User.findOne({ $or: [{ username }, { email }] });
  return user ? user : null;
}
