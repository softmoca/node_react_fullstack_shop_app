const { default: mongoose } = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    user: {
      // 구매한 사람
      type: Object,
    },
    data: {
      // 결제 정보들 ( 예를 들어 paypal에서 구매한 결제 정보)
      type: Array,
      default: [],
    },
    product: {
      // 구매한 정보들
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
