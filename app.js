const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      user: config.get("user"),
      pass: config.get("pass"),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`App has benn started on port ${PORT}...`);
    });
  } catch (e) {
    console.log("Server Error", e);
    process.exit(1);
  }
}

start();
