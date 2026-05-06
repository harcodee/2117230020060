const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

const allowedStacks = ["backend", "frontend"];

const allowedLevels = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

const allowedPackages = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  "auth",
  "config",
  "middleware",
  "utils",
];

async function Log(stack, level, packageName, message) {
  try {
    // validation

    if (!allowedStacks.includes(stack)) {
      throw new Error("Invalid stack");
    }

    if (!allowedLevels.includes(level)) {
      throw new Error("Invalid level");
    }

    if (!allowedPackages.includes(packageName)) {
      throw new Error("Invalid package");
    }

    const response = await axios.post(LOG_API, {
      stack,
      level,
      package: packageName,
      message,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    console.log("Log Created:", response.data);

    return response.data;

  } catch (error) {

    console.error("Logger Error:", error.message);
  }
}

module.exports = Log;