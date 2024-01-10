const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const { default: mongoose } = require("mongoose");

// --------------- Get User Profile Detail ------------------
// const getProfile = catchAsync(async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const userDetail = await User.findById(userId);
//     return res.status(200).json({
//       status: "200",
//       message: "User data fetched successfully!",
//       data: userDetail,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "500",
//       message: "An error occurred while fetcihng user data !",
//       error: error.message,
//     });
//   }
// });

const getProfile = catchAsync(async (req, res) => {
  try {
    console.log(getProfile, "getProfile");
    const userId = req.params.id;
    const userDetail = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 1,
          image: 1,
          first_name: 1,
          last_name: 1,
          address: 1,
          phone_number: 1,
          email: 1,
          role: 1,
        },
      },
    ]);

    if (userDetail.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "User not found!",
      });
    }

    // Extract the first element from the array
    const userDetailData = userDetail[0];

    return res.status(200).json({
      status: "200",
      message: "User data fetched successfully!",
      data: userDetailData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetcihng user data !",
      error: error.message,
    });
  }
});

// -------------------- Update User Profile ------------------
const updateProfile = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetail = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    userDetail.save();
    return res.status(200).json({
      status: "200",
      message: "User data updated successfully!",
      data: userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while updating user data !",
      error: error.message,
    });
  }
});

// ------------------------ Delete User Profile ------------------
const deleteProfile = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findOneAndDelete({ _id: userId });
    return res.status(200).json({
      status: "200",
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while deleting user data !",
      error: error.message,
    });
  }
});

// --------------------- Get List of all user's ------------------
const getList = catchAsync(async (req, res) => {
  const currentUser = req.user;
  const selectedRole = req.query.role;
  const searchName = req.query.name;

  const perPage = 10; //  Number of documents to display on each page
  const page = req.query.page ? parseInt(req.query.page, 10) : 1; // It specify the selected page number

  const query = {
    _id: { $ne: currentUser }, // List will not show the loggedin User
    role: selectedRole,
  };

  if (searchName) {
    const searchValue = new RegExp(searchName, "i");
    query.$or = [{ first_name: searchValue }, { email: searchValue }];
  } // You can search user through name or email

  try {
    const totalCount = await User.countDocuments(query);

    const userList = await User.find(query)
      .skip(perPage * (page - 1))
      .limit(perPage);

    return res.status(200).json({
      status: "200",
      message: "User list fetched successfully!",
      data: userList,
      page,
      totalPages: Math.ceil(totalCount / perPage),
      count: userList.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetching user list!",
      error: error.message,
    });
  }
});

module.exports = {
  getProfile,
  updateProfile,
  getList,
  deleteProfile,
};
