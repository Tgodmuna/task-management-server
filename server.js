const logger = require("./src/config/logger");
const app = require("./src/app");
const envPort = require("./src/utill/envPORT");

app.listen(envPort(), () => {
  logger.info(`Server is running on port ${envPort()}`);
});
