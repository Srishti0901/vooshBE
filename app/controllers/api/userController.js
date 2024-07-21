const userSchemaValidation = require("../../schema/user.schema");
const { user: userService, createResponse } = require("../../services/index");

const login = async (req, res) => {
  try {
    const { value: validRequestData, error: invalidRequest } =
      userSchemaValidation.login.validate(req.body, {
        stripUnknown: true,
      });
    if (invalidRequest) {
      throw new Error(invalidRequest.message);
    }
    const response = await userService.login(validRequestData);
    return res.status(200).json(createResponse(true, null, response));
  } catch (error) {
    return res.status(404).json(createResponse(false, error.message));
  }
};

const signup = async (req, res) => {
  try {
    const { value: validRequestData, error: invalidRequest } =
      userSchemaValidation.signup.validate(req.body, {
        stripUnknown: true,
      });
    if (invalidRequest) {
      throw new Error(invalidRequest.message);
    }
    const response = await userService.signup(validRequestData);
    return res.status(200).json(createResponse(true, null, response));
  } catch (error) {
    return res.status(404).json(createResponse(false, error.message));
  }
};

module.exports = {
  login,
  signup,
};
