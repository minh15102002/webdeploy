const axios = require("axios");
const jwt = require("jsonwebtoken");

require("dotenv").config();
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
const createJWT = (payload) => {
  let token = null;
  let key = process.env.JWT_SECRET;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let decoded = null;
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};
const getHome = async (req, res) => {
  try {
    //console.log(productAllRate.data)
    return res.render("admin/indexAdmin.ejs");
  } catch (error) {
    console.log(error);
  }
};
const loginAdmin = async (req, res) => {
  let cookie = req.cookies;
  let erro = req.flash("erro");
  //console.log(cookie.jwtadmin)
  if (cookie && cookie.jwtadmin) {
    let token = cookie.jwtadmin;
    let decoded = verifyToken(token);
    //console.log(decoded);
    if (decoded) {
      res.cookie("adminUserId", decoded.id, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      let getUser = await axios.get(
        process.env.BASE_URL + `user/${decoded.user_id}`
      );
      //console.log(getUser)
      res.cookie("adminname", getUser.data.user.name, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("adminusername", getUser.data.user.username, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("adminphone", getUser.data.user.phone, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("adminemail", getUser.data.user.email, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("adminaddress", getUser.data.user.address, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.redirect("/admin/products");
    } else {
      return res.render("admin/loginAdmin.ejs", { erro });
    }
  } else {
    return res.render("admin/loginAdmin.ejs", { erro });
  }
};
const handleLoginAdmin = async (req, res) => {
  try {
    let data = await axios.post(process.env.BASE_URL + `loginAdmin`, req.body);

    if (data.data.success == false) {
      req.flash("erro", `${data.data.message}`);
    } else {
      req.flash("success", `${data.data.message}`);
      console.log(data.data.user.id);
      res.cookie("adminUserId", data.data.user.id, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("jwtadmin", data.data.token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    //console.log(data.data);
    return res.redirect("/loginAdmin");
  } catch (error) {
    console.log(error.response.data.detail);
    req.flash("erro", `${error.response.data.detail}`);
    return res.redirect("/loginAdmin");
  }
};
module.exports = {
  getHome,
  loginAdmin,
  handleLoginAdmin,
};
