const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const port = 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("연결 완료");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());

app.get("/", (req, res) => {
  res.send("gd");
});

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다!.`);
});
