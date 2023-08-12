const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true, // 빈칸 있는거 없엠
    unique: true, // 중복 허용안함
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },

  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  let user = this; //user.password는 DB에 있는 해쉬된 비밀번호
  const match = await bcrypt.compare(plainPassword, user.password);
  return match; //true나 false를 반환
};
const User = mongoose.model("User", userSchema);

module.exports = User;
