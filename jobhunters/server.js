const Express = require("express");

const app = Express();
const appPort = 7000;

module.exports = app.listen(appPort, () => {
  console.log(`app has been started on port number ${appPort}`);
});
