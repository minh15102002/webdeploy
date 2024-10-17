const axios = require("axios");
require("dotenv").config();

const indexCategory = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let page = req.query.page || 1;
    let params = {
      page,
    };
    let data_categories = await axios.get(
      process.env.BASE_URL + `admin/categories`,
      { params }
    );
    return res.render("admin/category.ejs", {
      categories: data_categories.data.categories,
      total_page: data_categories.data.total_page,
      current_page: data_categories.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeCategory = async (req, res) => {
  try {
    let data = await axios.post(
      process.env.BASE_URL + "admin/categories/store",
      req.body
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/admin/categories");
  }
};

const deleteCategory = async (req, res) => {
  try {
    let category_id = req.params.category_id;
    let data = await axios.delete(
      process.env.BASE_URL + `admin/categories/delete/${category_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/categories`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/categories`);
  }
};

module.exports = {
  storeCategory,
  indexCategory,
  deleteCategory,
};
