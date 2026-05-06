const Log = require("../config/logger");

const testHandler = async (req, res) => {

  await Log(
    "backend",
    "info",
    "controller",
    "Test endpoint triggered"
  );

  res.status(200).json({
    success: true,
    message: "Backend working",
  });
};

module.exports = {
  testHandler,
};