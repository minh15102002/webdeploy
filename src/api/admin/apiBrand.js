const axios = require("axios");

require("dotenv").config();

const indexBrand = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let page = req.query.page || 1;
    let params = {
      page,
    };
    let data_brands = await axios.get(process.env.BASE_URL + `admin/brands`, {
      params,
    });
    return res.render("admin/brand.ejs", {
      brands: data_brands.data.brands,
      total_page: data_brands.data.total_page,
      current_page: data_brands.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeBrand = async (req, res) => {
  try {
    let data = await axios.post(
      process.env.BASE_URL + "admin/brands/store",
      req.body
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect("/admin/brands");
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/admin/brands");
  }
};

const deleteBrand = async (req, res) => {
  try {
    let brand_id = req.params.brand_id;
    let data = await axios.delete(
      process.env.BASE_URL + `admin/brands/delete/${brand_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/brands`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/brands`);
  }
};

module.exports = {
  storeBrand,
  indexBrand,
  deleteBrand,
};
