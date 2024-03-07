const mongoose = require("mongoose")

const outcomeSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: false,
    },
      category: {
        type: String,
        enum: ["6", "7", "8", "9", "10"],
        required: true,
    },
      description: {
        type: String,
        required: false,
    },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{ timestamps: true }
)

module.exports = mongoose.model("Outcome",outcomeSchema)