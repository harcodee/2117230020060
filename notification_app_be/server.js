require("dotenv").config();
const app = require("./src/app");
const Log = require("./src/config/logger");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await Log("backend", "info", "config", "Server started successfully");
  console.log(`Server listening on port ${PORT}`);
});
