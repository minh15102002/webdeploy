const axios = require("axios");
require("dotenv").config();

const handleRegister = async (req, res) => {
  try {
    let data = await axios.post(process.env.BASE_URL + `register`, req.body);
    console.log(data.data.success);
    if (data.data.success == true) {
      req.flash("success", "Đăng ký thành công !");
    }
    return res.redirect("/register");
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/register");
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await axios.post(process.env.BASE_URL + `login`, req.body);
    if (data.data.success == true) {
      console.log(data.data);
      req.flash("success", `${data.data.message}`);
      res.cookie("UserId", data.data.user.id, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("token", data.data.token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    return res.redirect("/login");
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/login");
  }
};

const handleAuth = async (token) => {
  try {
    let data = await axios.get(process.env.BASE_URL + `authenticate/${token}`);
    if (data.data.success == true) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleAuth,
};
