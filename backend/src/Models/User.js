const { default: mongoose } = require("mongoose");

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
  image: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
