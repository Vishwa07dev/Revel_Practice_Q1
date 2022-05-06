const Express = require("express");

// Server requirements
const { PORT: appPort } = require("./config/server.config");

const app = Express();

module.exports = app.listen(appPort, () => {
  console.log(`app has been started on port number ${appPort}`);
});
