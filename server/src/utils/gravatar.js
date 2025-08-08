import crypto from "crypto";

/**
 * Generates a Gravatar URL based on the user's email.
 * @param {string} email - The user's email address.
 * @param {number} size - Size of the avatar in pixels.
 * @param {string} defaultImage - Default image type (identicon, mp, etc.)
 * @returns {string} - The Gravatar URL
 */
export function getGravatarUrl(email, size = 200, defaultImage = "identicon") {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("sha256").update(trimmedEmail).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`;
}
