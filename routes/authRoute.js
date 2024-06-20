const express = require("express");
const registerController = require("../controllers/registerController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const {
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/loginController");
const forgotPasswordController = require("../controllers/forgotPasswordController");
// const testController = require("../controllers/loginController");
const router = express.Router();
//register || post
router.post("/Register", registerController);
//login ||post
router.post("/login", loginController);
// forgot post
router.post("/forgot-password", forgotPasswordController);
//test route
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth to show dashboard to user
router.get("/user-auth", requireSignIn, (req, res) =>
  res.status(200).send({ ok: true })
);
// protected route auth to show dashboard to Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) =>
  res.status(200).send({ ok: true })
);
// update profile
router.put("/profile", updateProfileController);
//get orders
router.get("/orders", getOrdersController);
// get all orders
router.get("/all-orders", getAllOrdersController);
// order status update
router.get("/order-status", orderStatusController);
module.exports = router;
