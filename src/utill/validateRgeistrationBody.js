/**
 * Validates the registration body using Joi schema.
 *
 * @param {Object} body - The registration body to validate.
 * @param {string} body.name - The name of the user.
 * @param {string} body.email - The email of the user.
 * @param {string} body.password - The password of the user.
 * @returns {string|null} - Returns an error message if validation fails, otherwise null.
 */
const Joi = require("joi");

const bodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

function validateBody(body) {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return "Please fill all fields";
  }

  const { error } = bodySchema.validate(body);

  if (error) {
    return error.details[0].message;
  }

  return null;
}

module.exports = validateBody;
