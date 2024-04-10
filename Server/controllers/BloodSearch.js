const User = require("../models/User");

exports.BloodSearch = async (req, res) => {
  try {
    // fetch the data from req.body
    const { bloodGroup, taluka, district } = req.query;
    // validate
    if (!bloodGroup || !taluka || !district) {
      return res.status(401).json({
        success: false,
        message: "Please fill up all the details correctly",
      });
    }
    // check in db wheather data is present
    const data = await User.find({
      bloodGroup: bloodGroup,
      taluka: taluka,
      district: district,
    });
    if (!data) {
      return res.status(401).json({
        success: false,
        message:
          "No data available for the entered taluka or district or bloodGroup type",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data for the entered inputs",
      Information: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went Wrong,Please try again",
    });
  }
};
