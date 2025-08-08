const _config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

const ENV_TESTING = process.env.NODE_ENV === "testing";
const ENV = ENV_TESTING ? _config : Object.freeze(_config);

export { ENV };
