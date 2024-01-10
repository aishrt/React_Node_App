const catchAsync = require("../utils/catchAsync");
const { Marks } = require("../models");
const mongoose = require("mongoose");

const addMarks = catchAsync(async (req, res) => {
  const identity = req.body.userId;
  const alreadyExist = await Marks.findOne({ userId: identity });
  if (alreadyExist) {
    const updatedData = await Marks.findOneAndUpdate(
      { userId: identity },
      req.body,
      {
        new: true,
      }
    );
    if (updatedData) {
      return res.status(200).json({
        status: 200,
        message: "Marks updated successfully",
        data: updatedData,
      });
    }
    return res.status(401).json({
      status: 401,
      message: "Error while updating marks.",
    });
  } else {
    const result = Marks.create(req.body);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Marks added successfully",
        data: result,
      });
    }
    return res.status(401).json({
      status: 401,
      message: "Error while adding marks.",
    });
  }
});

const marksList = catchAsync(async (req, res) => {
  const identity = req.params.id;
  const result = await Marks.aggregate([
    {
      $match: {
        userId: mongoose.Types.ObjectId(identity),
      },
    },
    {
      $project: {
        userId: 1,
        maths: 1,
        science: 1,
        sst: 1,
        english: 1,
        hindi: 1,
        total: {
          $add: ["$maths", "$science", "$sst", "$english", "$hindi"],
        },
      },
    },
  ]);

  if (result) {
    const singleData = result?.[0];
    return res.status(200).json({
      status: 200,
      message: "Marks list fetched successfully",
      data: singleData,
    });
  }
  return res.status(401).json({
    status: 401,
    message: "Marks list empty",
  });
});

module.exports = {
  marksList,
  addMarks,
};
