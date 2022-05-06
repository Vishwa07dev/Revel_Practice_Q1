if (process.env.DEPLOYMENT !== "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
};
