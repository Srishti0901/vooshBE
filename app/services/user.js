const UserRepository = require("../repository/user.repository");
const Util = require("../../utils");

const login = async ({ email, password }) => {
  let user = await UserRepository.findUser({ email });
  if (!user) {
    throw new Error("User does not exists");
  }
  const validPassword = await Util.comparePassword(user, password);
  if (!validPassword) {
    throw new Error("Incorrect Password");
  }
  const token = Util.createToken({ userId: user._id });
  const response = { token, user_id: user._id };
  return response;
};

const signup = async (data) => {
  const { email, firstName, lastName, password, confirmPassword } = data;
  let user = await UserRepository.findUser({ email });
  if (user) {
    throw new Error("User Already Exists");
  }
  if (password !== confirmPassword) {
    throw new Error("Password does not match");
  }
  const hashedPassword = await Util.getHashedPassword(password);
  user = await UserRepository.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  const token = Util.createToken({ userId: user._id });
  const response = {
    message: "User created successfully",
    token,
    userId: user._id,
  };
  return response;
};

module.exports = {
  login,
  signup,
};
