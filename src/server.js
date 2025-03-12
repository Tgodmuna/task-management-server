const logger = require("../src/config/logger");
const app = require("./app");
const envPort = require("./utill/envPORT");

app.listen(envPort(), () => {
  logger.info(`Server is running on port ${envPort()}`);
});
