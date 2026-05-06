const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

// Sends logs to the external evaluation service
async function Log(stack, level, packageName, message) {
  try {
    await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
      }
    );
  } catch (error) {
    // Just console erroring here so it doesn't crash the app if logging fails
    console.error("Failed to push log:", error.message);
  }
}

module.exports = Log;
