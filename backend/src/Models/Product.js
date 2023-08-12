const { default: mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
  writer: {
    // 상품을 만든 사람 User를 참조
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxLength: 30,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  continents: {
    // 어디 대륙에서 왔는가
    type: Number,
    default: 1,
  },
  views: {
    // 상품을 몇번 이나 봤는지
    type: Number,
    default: 0,
  },
});

productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
