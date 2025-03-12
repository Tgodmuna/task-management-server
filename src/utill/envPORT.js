/**
 * Retrieves the JWT secret key based on the current environment.
 *
 * @returns {string} The JWT secret key.
 */
function envPort() {
  if (process.env.NODE_ENV === "production") {
    return process.env.PROD_PORT || "defaultProdPORT";
  } else {
    return process.env.DEV_PORT || "defaultDevPORT";
  }
}
module.exports = envPort;
