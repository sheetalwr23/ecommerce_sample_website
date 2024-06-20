const UserModel = require("../models/userModel");
const { hashPassword } = require("../helpers/authHelper");

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Check if required fields are provided
    if (!email || !answer || !newPassword) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Find user by email and answer
    const user = await UserModel.findOne({ email, answer });

    // If user not found, return error
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Wrong email or answer" });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password
    await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    // Send success response
    res
      .status(200)
      .send({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error: error });
  }
};

module.exports = forgotPasswordController;
