const express = require("express");
const router = express.Router();

const productController = require("../../controllers/user/productController");
const authController = require("../../controllers/user/authController");
const orderController = require("../../controllers/user/orderController");
const categoryController = require("../../controllers/user/categoryController");
const brandController = require("../../controllers/user/brandController");

router.get("/products/home", productController.getProductHome);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/authenticate/:token", authController.authLogin);

router.post("/order", orderController.addOrder);
router.get("/orderWait/:user_id", orderController.getOrderWait);
router.get("/orderShip/:user_id", orderController.getOrderShip);
router.get("/orderComplete/:user_id", orderController.getOrderComplete);
router.get("/orderCancel/:user_id", orderController.getOrderCancel);
router.get("/actionCancelOrder/:order_id", orderController.handleCancelOrder);
router.get(
  "/actionConfirmOrder/:order_id",
  orderController.handleUpdateConfirm
);

router.get("/products/detail/:id", productController.getProductDetail);

router.get(
  "/products/search/:product_name",
  productController.getProductSearch
);

router.get("/categories/:category_id", categoryController.getProductCategory);
router.get("/brands/:brand_id", brandController.getProductBrand);

module.exports = router;
