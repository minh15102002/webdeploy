const db = require("../../models/index");

const indexProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: products } = await db.Product.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      include: [db.Brand, db.Category],
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, price, description, brand_id, category_id } = req.body;
    if (
      !name ||
      !image ||
      !price ||
      !description ||
      !category_id ||
      !brand_id
    ) {
      return res
        .status(400)
        .json({ detail: "Vui lòng điền đầy đủ thông tin sản phẩm !" });
    }
    let product = await db.Product.create({
      name: name,
      image: "/images/products/" + image,
      description: description,
      price: price,
      BrandId: brand_id,
      CategoryId: category_id,
    });
    return res.status(200).json({
      success: true,
      message: "Thêm sản phẩm thành công !",
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res) => {
  try {
    let product_id = req.params.product_id;
    let data_product = await db.Product.findOne({
      where: { id: product_id },
    });
    if (!data_product) {
      return res.status(404).json({
        detail: "Không tồn tại sản phẩm !",
      });
    }
    let categories = await db.Category.findAll();
    let brands = await db.Brand.findAll();
    return res.status(200).json({
      success: true,
      product: data_product,
      categories: categories,
      brands: brands,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log("Data:", req.body);
    let product_id = req.params.product_id;
    let { name, image, price, description, brand_id, category_id } = req.body;
    if (!name || !price || !description || !category_id || !brand_id) {
      return res
        .status(400)
        .json({ detail: "Vui lòng điền đầy đủ thông tin sản phẩm !" });
    }
    let product = await db.Product.findOne({
      where: { id: product_id },
    });
    if (!product) {
      return res.status(404).json({ detail: "Không tồn tại sản phẩm !" });
    }
    if (!image) {
      image = product.image;
    } else {
      image = "/images/products/" + image;
    }
    if (!brand_id) {
      brand_id = product.BrandId;
    }
    if (!category_id) {
      category_id = product.CategoryId;
    }
    await db.Product.update(
      {
        name: name,
        image: image,
        description: description,
        price: price,
        BrandId: brand_id,
        CategoryId: category_id,
      },
      {
        where: {
          id: product_id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Sửa sản phẩm thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddProduct = async (req, res) => {
  try {
    let categories = await db.Category.findAll();
    let brands = await db.Brand.findAll();
    return res.status(200).json({
      success: true,
      categories: categories,
      brands: brands,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const product = await db.Product.findOne({
      where: {
        id: product_id,
      },
    });
    if (!product) {
      return res.status(404).json({
        detail: "Không tồn tại sản phẩm !",
      });
    }
    const order_product = await db.Order_Product.findOne({
      where: {
        ProductId: product_id,
      },
    });
    if (order_product) {
      return res.status(409).json({
        detail: `Sản phẩm hiện đang tồn tại trong đơn hàng ID:${order_product.OrderId}`,
      });
    }
    await db.Product.destroy({
      where: {
        id: product_id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  indexProduct,
  editProduct,
  storeProduct,
  updateProduct,
  deleteProduct,
  getAddProduct,
};
