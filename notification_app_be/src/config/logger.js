const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

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
    console.error("Logger Error:", error.message);
  }
}

module.exports = Log;
