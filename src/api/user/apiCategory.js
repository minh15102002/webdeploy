const axios = require("axios");
require("dotenv").config();

const getCategory = async (req, res) => {
  try {
    let data = await axios.get(process.env.BASE_URL + "categories");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getProductCategory = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const params = {
      page,
    };
    let data_category = await axios.get(
      process.env.BASE_URL + `categories/${req.params.category_id}`,
      { params }
    );
    console.log("Data:", data_category.data.products);
    return res.render("user/category.ejs", {
      products: data_category.data.products,
      category_id: data_category.data.category_id,
      categories: data_category.data.categories,
      total_page: data_category.data.total_page,
      current_page: data_category.data.current_page,
      category_id: req.params.category_id,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCategory,
  getProductCategory,
};
