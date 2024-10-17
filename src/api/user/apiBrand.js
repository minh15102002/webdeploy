const axios = require("axios");
require("dotenv").config();

const getProductBrand = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const params = {
      page,
    };
    let data_category = await axios.get(
      process.env.BASE_URL + `brands/${req.params.brand_id}`,
      { params }
    );
    console.log("Data:", data_category.data.products);
    return res.render("user/brand.ejs", {
      products: data_category.data.products,
      brand_id: data_category.data.brand_id,
      brands: data_category.data.brands,
      total_page: data_category.data.total_page,
      current_page: data_category.data.current_page,
      brand_id: req.params.brand_id,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductBrand,
};
