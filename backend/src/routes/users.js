const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const async = require("async");

router.get("/auth", auth, async (req, res, next) => {
  return res.json({
    // 인증된 user의 정보들을 보내준다.
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  // req.body   password , email
  try {
    // 존재하는 유저인지 체크
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }

    // 비밀번로가 올바른 것인지 체크
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong password");
    }

    const payload = {
      userId: user._id.toHexString(), // 몽고 DB의 id는 Object로 되어있어서 전처리
    };

    // token을 생성
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ user: user, accessToken: accessToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
