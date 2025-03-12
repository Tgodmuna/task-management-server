const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().pattern(new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")),
  password: Joi.string().min(8).max(50).required(),
});

/**
 * Validates the login request body.
 *
 * @param {Object} body - The request body containing login details.
 * @param {string} body.email - The email address of the user.
 * @param {string} body.password - The password of the user.
 * @returns {string|boolean} - Returns an error message if validation fails, otherwise returns true.
 */
function validateLogin(body) {
  if (!body.email || !body.password) {
    return "Email and password are required";
  }

  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return "Email and password must be strings";
  }

  const { error } = loginSchema.validate(body);

  if (error) {
    return error.details[0].message;
  }

  return true;
}

module.exports = validateLogin;
