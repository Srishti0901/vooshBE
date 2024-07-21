const User = require("../../models/userSchema");

const findUser = async ({ email }) => {
  const user = await User.findOne({ email });
  console.log(user);
  return user;
};

const create = ({ email, firstName, lastName, password }) => {
  return new User({ firstName, lastName, email, password }).save();
};
const UserRepository = {
  findUser,
  create,
};

module.exports = UserRepository;
