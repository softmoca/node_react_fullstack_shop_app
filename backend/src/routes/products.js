const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");

router.post("/", auth, async (req, res, next) => {
  // 로그인이 된 사람만 가능하니 auth 미들웨어도 넣는다.
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
