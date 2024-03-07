const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Add name"],
    },
    email: {
      type: String,
      required: [true, "Add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "add password"],
    },
    role: {
      type: String,
      default: "simple",
    },
    incomes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income",
      },
    ],
    outcomes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Outcome",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
