const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 어떤 경로상에 파일을 업로드 할것인지.
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //Date.now를 사용해서 유니크한 이름 가지게함
    cb(null, `${Date.now()}_${file.originalname}`);
  }, // 에러가 있으면 첫번쨰 인자에 넣어야 하지만 우선 null
});

const upload = multer({ storage: storage }).single("file"); // 하나의 이미지를 올림
//프론트에서 추가한 formData.append("file",files[0]) 에서 첫번째 인자와 single의 인자가 같아야함

router.get("/", async (req, res, next) => {
  // asc 오름차순  , desc 내림차순
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const term = req.query.searchTerm;

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      findArgs[key] = req.query.filters[key];
    }
  }

  console.log(findArgs);

  try {
    // 아무나 가져 올 수 있게 하기 위해 auth 미들웨어 사용 X
    const products = await Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    // 디비에 데이터 개수 확인하고 더보기 가능한지 체크
    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal ? true : false;

    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/image", auth, async (req, res, next) => {
  //console.log(req);

  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.json({ fileName: res.req.file.filename });
  });
});

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
