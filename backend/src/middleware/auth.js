const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next) => {
  // 토큰을 request headers에서 가져오기
  const authHeader = req.headers["authorization"];

  // Bearer ooerkogkeorkgoek.erogkoerkog.eorgkoerkgoerkgokg
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401); // 토큰이 없으면 에러 던지기

  try {
    // 데이터베이스의 sercet key를 사용해서 복호화 하여 토큰이 유효한 토큰인지 확인
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    //decode는 header,payload,signature등 토큰에 포함된 정보를 반환한다.
    const user = await User.findOne({ _id: decode.userId });
    //payload에 있는 유저의 id를 사용
    if (!user) {
      return res.status(400).send("없는 유저입니다.");
    }

    req.user = user;
    //console.log(req.user);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
