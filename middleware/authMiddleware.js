const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModel");
//protected Route token based
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // decrypting otherwise we can not get Id
    req.user = decode;
    next();
  } catch (error) {
    console.log("middleware error", error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.role !== 1) {
      // Assuming role 1 represents admin role
      return res.status(401).json({
        success: false,
        message: "Unauthorized User other than admin",
        user: { name: user.name },
      });
    }
    next();
  } catch (error) {
    console.log("Invalid admin details", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { requireSignIn, isAdmin };
