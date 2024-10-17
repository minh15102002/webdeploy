const axios = require("axios");
require("dotenv").config();

const handleLoginAdmin = async (req, res) => {
  try {
    let data = await axios.post(process.env.BASE_URL + `admin/login`, req.body);
    if (data.data.success == true) {
      console.log(data.data);
      res.cookie("AdminId", data.data.user.id, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("tokenAdmin", data.data.token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.redirect("/admin/dashboard");
    }
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/admin");
  }
};

const authAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;
    let data = await axios.get(
      process.env.BASE_URL + `admin/authenticate/${token}`
    );
    if (data.data.success) {
      return res.redirect("/admin/dashboard");
    }
  } catch (error) {
    console.log(error.response.data.detail);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
      return res.redirect("/admin");
    }
  }
};

module.exports = {
  handleLoginAdmin,
  authAdmin,
};
