const joi = require('joi');

const login = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})

const signup = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
})

const userSchemaValidation = {
    login,
    signup,
}

module.exports = userSchemaValidation;