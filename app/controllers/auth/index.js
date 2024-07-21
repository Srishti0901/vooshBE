const jwt = require("jsonwebtoken");
const config = require("../../../config/index");
const Util = require("../../../utils/index");
const User = require("../../../models/userSchema");
const UserRepository = require("../../repository/user.repository");
const { createResponse } = require("../../services");
const axios = require("axios");

const validateJwt = async (req, res, next) => {
  const token =
    req.headers && req.headers.authorization && req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ _id: userId }, { _id: 1 });
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

const googleLoginStart = async (req, res) => {
  const scope =
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.server.CLIENTID}&redirect_uri=${config.server.REDIRECT_URI}&response_type=code&scope=${scope}`;
  res.redirect(url);
};

const oauthLoginCallback = async (req, res) => {
  const { code } = req.query;
  console.log("code", code);
  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: config.server.CLIENTID,
      client_secret: config.server.CLIENT_SECRET,
      redirect_uri: config.server.REDIRECT_URI,
      grant_type: "authorization_code",
    });
    const { access_token, id_token } = data;
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const user = await UserRepository.findUser({ email: profile.email });
    if (!user) {
      throw new Error("User has not registered using email");
    }
    const token = Util.createToken({ userId: user._id });
    return res.status(200).json({
      success: true,
      error: null,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error:", error);
    res.redirect("http://localhost:3000/login");
  }
};

const isAuthenticated = {
  validateJwt,
  googleLoginStart,
  oauthLoginCallback,
};
module.exports = isAuthenticated;
