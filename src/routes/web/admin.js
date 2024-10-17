const express = require("express");
const router = express.Router();
const apiProduct = require("../../api/admin/apiProduct");
const apiOrder = require("../../api/admin/apiOrder");
const apiUser = require("../../api/admin/apiUser");
const apiCategory = require("../../api/admin/apiCategory");
const apiBrand = require("../../api/admin/apiBrand");
const apiAuth = require("../../api/admin/apiAuth");
const middleware = require("../../middleware/middleware");

//home
router.get(
  "/dashboard",
  middleware.checkRequireLoginAdmin,
  apiProduct.indexproduct
);
//login
router.post("/login", apiAuth.handleLoginAdmin);
router.get("/", middleware.checkLoginAdmin);
router.get("/logout", (req, res) => {
  res.cookie("tokenAdmin", "", { maxAge: 0 });
  res.cookie("AdminId", "", { maxAge: 0 });
  return res.redirect("/admin");
});

//product
router.get(
  "/products/create",
  middleware.checkRequireLoginAdmin,
  apiProduct.getAddProduct
);
router.get(
  "/products/edit/:product_id",
  middleware.checkRequireLoginAdmin,
  apiProduct.editProduct
);
router.post(
  "/products/store",
  middleware.checkRequireLoginAdmin,
  apiProduct.storeProduct
);
router.post(
  "/products/update",
  middleware.checkRequireLoginAdmin,
  apiProduct.updateProduct
);
router.get(
  "/products/delete/:product_id",
  middleware.checkRequireLoginAdmin,
  apiProduct.deleteProduct
);
//order
router.get("/orders", middleware.checkRequireLoginAdmin, apiOrder.indexOrder);
router.get(
  "/confirm_orders/:order_id",
  middleware.checkRequireLoginAdmin,
  apiOrder.confirmOrder
);
router.get(
  "/orders/delete/:order_id",
  middleware.checkRequireLoginAdmin,
  apiOrder.deleteOrder
);
//user
router.get("/users", middleware.checkRequireLoginAdmin, apiUser.indexUser);
router.get(
  "/users/update_role/:user_id",
  middleware.checkRequireLoginAdmin,
  apiUser.updateUser
);
router.get(
  "/users/cancel_role/:user_id",
  middleware.checkRequireLoginAdmin,
  apiUser.cancelRole
);
router.get(
  "/users/delete/:user_id",
  middleware.checkRequireLoginAdmin,
  apiUser.deleteUser
);
//category
router.get(
  "/categories",
  middleware.checkRequireLoginAdmin,
  apiCategory.indexCategory
);
router.post(
  "/categories/store",
  middleware.checkRequireLoginAdmin,
  apiCategory.storeCategory
);
router.get(
  "/categories/delete/:category_id",
  middleware.checkRequireLoginAdmin,
  apiCategory.deleteCategory
);
//brand
router.get("/brands", middleware.checkRequireLoginAdmin, apiBrand.indexBrand);
router.post(
  "/brands/store",
  middleware.checkRequireLoginAdmin,
  apiBrand.storeBrand
);
router.get(
  "/brands/delete/:brand_id",
  middleware.checkRequireLoginAdmin,
  apiBrand.deleteBrand
);
module.exports = router;
