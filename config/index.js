const config = {};
config.server = {
  PORT: 8080,
  MONGODB_PASS: process.env.MONGODB_PASS || "voosh123",
  MONGODB_USERNAME: process.env.MONGODB_USERNAME || "voosh",
  SECRET_KEY: process.env.SECRET_KEY || "asiifohowhcoshsdnsj",
  CLIENTID: process.env.OAUTH_CLIENT_ID,
  CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  REDIRECT_URI:
    "https://voosh-task-app.netlify.app/client/auth/google/callback",
};

module.exports = config;
