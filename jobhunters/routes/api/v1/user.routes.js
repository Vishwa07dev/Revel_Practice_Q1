module.exports = (app) => {
  app.post("/api/v1/users/", (req, res) => {
    res.status(200).send({
      message: "Create a new user",
    });
  });
};
