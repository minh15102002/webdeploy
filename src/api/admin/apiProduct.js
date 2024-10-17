const axios = require("axios");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./src/public/images/products");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const indexproduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    const page = req.query.page || 1;
    const params = {
      page,
    };
    let data_product = await axios.get(
      process.env.BASE_URL + `admin/products`,
      { params }
    );
    return res.render("admin/dashboard.ejs", {
      products: data_product.data.products,
      current_page: data_product.data.current_page,
      total_page: data_product.data.total_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let data = await axios.get(process.env.BASE_URL + `admin/products/create`);
    return res.render("admin/create_product.ejs", {
      categories: data.data.categories,
      brands: data.data.brands,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeProduct = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      try {
        if (req.file) {
          image = req.file.originalname;
        } else {
          image = "";
        }
        const data_product = {
          name: req.body.name,
          image: image,
          price: req.body.price,
          description: req.body.description,
          brand_id: req.body.brand_id,
          category_id: req.body.category_id,
        };
        let data = await axios.post(
          process.env.BASE_URL + "admin/products/store",
          data_product
        );
        console.log(data);
        if (data.data.success) {
          req.flash("success", `${data.data.message}`);
        }
        return res.redirect("/admin/products/create");
      } catch (error) {
        console.log(error);
        if (error.response.data.detail) {
          req.flash("erro", `${error.response.data.detail}`);
        }
        return res.redirect("/admin/products/create");
      }
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      fs.unlinkSync(req.file.path);
      req.flash("erro", `${error.response.data.detail}`);
      console.log(req.flash("erro"));
    }
    return res.redirect("/admin/products/create");
  }
};

const editProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let id = req.params.product_id;
    const data = await axios.get(
      process.env.BASE_URL + `admin/products/edit/${id}`
    );
    return res.render("admin/edit_product.ejs", {
      product: data.data.product,
      categories: data.data.categories,
      brands: data.data.brands,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      const product_id = req.body.id;
      try {
        if (req.file) {
          image = req.file.originalname;
        } else {
          image = "";
        }
        const data_product = {
          name: req.body.name,
          image: image,
          price: req.body.price,
          description: req.body.description,
          brand_id: req.body.brand_id,
          category_id: req.body.category_id,
        };
        let data = await axios.put(
          process.env.BASE_URL + `admin/products/update/${product_id}`,
          data_product
        );
        console.log(data);
        if (data.data.success) {
          req.flash("success", `${data.data.message}`);
        }
        return res.redirect(`/admin/products/edit/${product_id}`);
      } catch (error) {
        console.log(error);
        if (error.response.data.detail) {
          req.flash("erro", `${error.response.data.detail}`);
        }
        return res.redirect(`/admin/products/edit/${product_id}`);
      }
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      fs.unlinkSync(req.file.path);
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/products/edit/${product_id}`);
  }
};

const deleteProduct = async (req, res) => {
  const product_id = req.params.product_id;
  try {
    let data = await axios.delete(
      process.env.BASE_URL + `admin/products/delete/${product_id}`
    );
    if (data.data.success !== false) {
      req.flash("success", `${data.data.message}`);
      res.redirect(`/admin/dashboard`);
    }
  } catch (error) {
    console.log(error);
    req.flash("erro", `${error.response.data.detail}`);
    res.redirect(`/admin/dashboard`);
  }
};

module.exports = {
  updateProduct,
  deleteProduct,
  indexproduct,
  getAddProduct,
  storeProduct,
  editProduct,
};
