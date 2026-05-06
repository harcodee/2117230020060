const app = require("./src/app");
const Log = require("./src/config/logger");

const PORT = 5000;

app.listen(PORT, async () => {
  await Log(
    "backend",
    "info",
    "service",
    "Server started successfully"
  );
});