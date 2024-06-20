const express = require("express");
const router = express.Router();
const {
  createProductController,
  updateProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
} = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const fromidableMiddleware = require("express-formidable");
router.post(
  "/create-product",
  // requireSignIn,
  // isAdmin,
  fromidableMiddleware(),
  createProductController
);
router.put(
  "/update-product/:productid",
  // requireSignIn,
  // isAdmin,
  fromidableMiddleware(),
  updateProductController
);
//get all products
router.get("/get-products", getProductController);
// get single product
router.get("/get-product/:slug", getSingleProductController);
// get photo
router.get("/get-productPhoto/:productid", productPhotoController);
// delete product
router.delete("/delete-product/:productid", deleteProductController);
// filter product
router.post("/product-filters", productFiltersController);
// product count
router.get("/product-count", productCountController);
// product per page
router.get("/product-list/:page", productListController);
// search product
router.get("/search/:keyword", searchProductController);
// similler product
router.get("/related-product/:pid/:cid", realtedProductController);
//category wise product
router.get("/product-category/:slug", productCategoryController);
module.exports = router;
