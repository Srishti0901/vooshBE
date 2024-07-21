module.exports = {
  user: require("./user"),
  task: require("./task"),
  createResponse(success, error, data, errorType) {
    return { success, error, data, errorType };
  },
};
