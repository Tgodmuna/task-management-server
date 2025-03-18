const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().pattern(new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")),
  password: Joi.string().min(6).max(50).required(),
});

/**
 * Validates the login request body.
 *
 * @param {Object} body - The request body containing login details.
 * @param {string} body.email - The email address of the user.
 * @param {string} body.password - The password of the user.
 */
function validateLoginBody(body) {
  if (!body.email || !body.password) {
    return new Error("Email and password are required");
  }

  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return new Error("Email and password must be strings");
  }

  const { error } = loginSchema.validate(body, { abortEarly: false });

  if (error) {
    // @ts-ignore
    return error;
  }
}

module.exports = validateLoginBody;
