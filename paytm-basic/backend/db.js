const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://saumayaggarwal6:1a2b3c@cluster0.f9lf0qm.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
