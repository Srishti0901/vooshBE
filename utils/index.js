const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const verifyToken = ({ userId }) => {
  try {
    const token = jwt.verify({ userId }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    return null;
  }
};
const createToken = ({ userId }) => {
  try {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    return null;
  }
};
const comparePassword = async (user, password) => {
  try {
    console.log(password, user.password);
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
  } catch (error) {
    return null;
  }
};

const getHashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    return null;
  }
};

const Util = {
  createToken,
  verifyToken,
  comparePassword,
  getHashedPassword,
};

module.exports = Util;
