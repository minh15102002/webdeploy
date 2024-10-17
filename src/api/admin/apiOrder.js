const axios = require("axios");
require("dotenv").config();

const indexOrder = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    const page = req.query.page || 1;
    const params = {
      page,
    };
    let data_product = await axios.get(process.env.BASE_URL + `admin/orders`, {
      params,
    });
    return res.render("admin/order.ejs", {
      orders: data_product.data.orders,
      current_page: data_product.data.current_page,
      total_page: data_product.data.total_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  const order_id = req.params.order_id;
  try {
    let data = await axios.delete(
      process.env.BASE_URL + `admin/orders/delete/${order_id}`
    );
    if (data.data.success !== false) {
      req.flash("success", `${data.data.message}`);
      res.redirect(`/admin/orders`);
    }
  } catch (error) {
    console.log(error);
    req.flash("erro", `${error.response.data.detail}`);
    res.redirect(`/admin/orders`);
  }
};

const confirmOrder = async (req, res) => {
  const order_id = req.params.order_id;
  try {
    let data = await axios.put(
      process.env.BASE_URL + `admin/confirm_orders/${order_id}`
    );
    if (data.data.success !== false) {
      req.flash("success", `${data.data.message}`);
      res.redirect(`/admin/orders`);
    }
  } catch (error) {
    console.log(error);
    req.flash("erro", `${error.response.data.detail}`);
    res.redirect(`/admin/orders`);
  }
};

module.exports = {
  confirmOrder,
  deleteOrder,
  indexOrder,
};
