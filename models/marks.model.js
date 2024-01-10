const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const marksSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    maths: {
      type: Number,
    },

    science: {
      type: Number,
    },

    sst: {
      type: Number,
    },

    english: {
      type: Number,
    },

    hindi: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

marksSchema.plugin(toJSON);

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
