const axios = require("axios");
require("dotenv").config();

const getProductHome = async (req, res) => {
  try {
    const data_product = await axios.get(
      process.env.BASE_URL + "products/home"
    );
    res.render("user/home.ejs", {
      product_nam: data_product.data.product_nam,
      product_nu: data_product.data.product_nu,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await axios.get(
      process.env.BASE_URL + `products/detail/${id}`
    );
    return res.render("user/detail.ejs", {
      product: data.data.product,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProductSearch = async (req, res) => {
  try {
    const product_name = req.query.product_name;
    const page = req.query.page || 1;
    const url = process.env.BASE_URL + `products/search/${product_name}`;
    const params = {
      page,
    };
    let data = await axios.get(url, { params });
    let products = data.data.products;
    return res.render("user/search.ejs", {
      products: products,
      total_page: data.data.total_page,
      product_name: product_name,
      current_page: data.data.current_page,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductHome,
  getProductDetail,
  getProductSearch,
};
