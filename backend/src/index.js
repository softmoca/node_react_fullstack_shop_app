const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
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

app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다.");
});

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다!.`);
});
