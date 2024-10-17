const axios = require("axios");
require("dotenv").config();
const order = async (req, res) => {
  try {
    let dataOrder = {
      user: req.body,
      cart: req.session.cart,
    };
    console.log("Data:", dataOrder);
    let data = await axios.post(process.env.BASE_URL + `order`, dataOrder);
    if (data.data.success == true) {
      req.session.cart = null;
      req.flash("success", `${data.data.message}`);
    }
    console.log(data.data);
    return res.redirect("/cart");
  } catch (error) {
    console.log("Loi:", error.response.data.detail);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/cart");
  }
};

const getOrderWait = async (req, res) => {
  try {
    let UserId = req.params.id;
    let data = await axios.get(process.env.BASE_URL + `orderWait/${UserId}`);
    console.log("Data order:", data.data.order);
    if (data.data.success !== false) {
      return res.render("user/order_wait.ejs", {
        orders: data.data.order,
        lastProduct: data.data.last_product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrderShip = async (req, res) => {
  try {
    let UserId = req.params.id;
    let data = await axios.get(process.env.BASE_URL + `orderShip/${UserId}`);
    if (data.data.success !== false) {
      return res.render("user/order_ship.ejs", {
        orders: data.data.order,
        lastProduct: data.data.last_product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrderComplete = async (req, res) => {
  try {
    let UserId = req.params.id;
    let data = await axios.get(
      process.env.BASE_URL + `orderComplete/${UserId}`
    );
    if (data.data.success !== false) {
      return res.render("user/order_complete.ejs", {
        orders: data.data.order,
        lastProduct: data.data.last_product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getOrderCancel = async (req, res) => {
  try {
    let UserId = req.params.id;
    let data = await axios.get(process.env.BASE_URL + `orderCancel/${UserId}`);
    if (data.data.success !== false) {
      return res.render("user/order_cancel.ejs", {
        orders: data.data.order,
        lastProduct: data.data.last_product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleConfirmOrder = async (req, res) => {
  try {
    let userId = req.cookies.UserId;
    let orderId = req.params.order_id;
    let data = await axios.get(
      process.env.BASE_URL + `actionConfirmOrder/${orderId}`
    );
    if (data.data.success === true) {
      return res.redirect(`/orderShip/${userId}`);
    }
  } catch (error) {
    console.log(error);
  }
};
const handleCancelOrder = async (req, res) => {
  try {
    let userId = req.cookies.UserId;
    let orderId = req.params.order_id;
    let data = await axios.get(
      process.env.BASE_URL + `actionCancelOrder/${orderId}`
    );
    if (data.data.success === true) {
      return res.redirect(`/order/${userId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  order,
  getOrderWait,
  getOrderShip,
  getOrderComplete,
  handleConfirmOrder,
  getOrderCancel,
  handleCancelOrder,
};
