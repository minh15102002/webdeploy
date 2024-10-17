const axios = require("axios");
require("dotenv").config();

const indexUser = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let page = req.query.page || 1;
    let params = {
      page,
    };
    let data_user = await axios.get(process.env.BASE_URL + "admin/users", {
      params,
    });
    return res.render("admin/user.ejs", {
      users: data_user.data.users,
      total_page: data_user.data.total_page,
      current_page: data_user.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const data = await axios.put(
      process.env.BASE_URL + `admin/users/update_role/${user_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/users`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/users`);
  }
};

const cancelRole = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const data = await axios.put(
      process.env.BASE_URL + `admin/users/cancel_role/${user_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/users`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/users`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const data = await axios.delete(
      process.env.BASE_URL + `admin/users/delete/${user_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/users`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/users`);
  }
};

module.exports = {
  indexUser,
  updateUser,
  deleteUser,
  cancelRole,
};
