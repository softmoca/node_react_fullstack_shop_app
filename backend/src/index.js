const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 4000;
const dotenv = require("dotenv");
app.use(cors());

let corsOptions = {
  origin: "http://localhost:5173/",
  credentials: true,
};

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("연결 완료");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

app.use(express.static(path.join(__dirname, "../uploads")));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다.");
});

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다!.`);
});
