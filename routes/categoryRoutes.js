const express = require("express");
const router = express.Router();
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
// createcategory
const {
  createCategoryController,
  updateCategoryController,
  getAllcategoryControlller,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/createCategoryController");

//create category
router.post(
  "/create-category",
  // requireSignIn,
  // isAdmin,
  createCategoryController
);
// update category
router.put(
  "/update-category/:id",
  // requireSignIn,
  // isAdmin,
  updateCategoryController
);
//get all category
router.get("/get-category", getAllcategoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",

  deleteCategoryController
);
module.exports = router;
