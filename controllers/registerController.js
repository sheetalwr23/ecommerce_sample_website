const { hashPassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    //exitsing  user
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "Alreday registerd please login" });
    }
    //register password
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: "true",
      message: "User registerd successfully",
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in registration", error });
  }
};
module.exports = registerController;
