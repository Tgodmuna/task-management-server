/**
 * Retrieves the JWT secret key from environment variables based on the current environment.
 *
 * @returns {string} The JWT secret key.
 */
function envJwtKey() {
  if (process.env.NODE_ENV === "production") {
    return process.env.PROD_jwtsecret || "";
  } else {
    return process.env.DEV_jwtsecret || "";
  }
}

module.exports = envJwtKey;
