const db = require("../../models/index");

const getProductHome = async (req, res) => {
  try {
    let product_nam = await db.Product.findAll({
      where: {
        CategoryId: 1,
        BrandId: 1,
      },
    });
    let product_nu = await db.Product.findAll({
      where: {
        CategoryId: 2,
        BrandId: 1,
      },
    });
    res.status(200).json({
      success: true,
      message: "Sản phẩm trang chủ !",
      product_nam: product_nam,
      product_nu: product_nu,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await db.Product.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProductDetailCart = async (req, res) => {
  try {
    let id = req.params.id;
    let StorageId = req.params.storage_id;
    let product = await db.Product.findOne({
      include: [
        {
          model: db.Color,
          attributes: ["name"],
        },
        {
          model: db.Price,
          attributes: ["id", "StorageId", "ProductId", "price_product"],
          include: {
            model: db.Storage,
            attributes: ["name"],
          },
          where: {
            StorageId: StorageId,
          },
        },
      ],
      where: {
        id: id,
      },
    });
    res.status(200).json({
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductSearch = async (req, res) => {
  try {
    let limit = 8;
    let page = req.query.page || 1;
    let product_name = req.params.product_name;
    const offset = (page - 1) * limit;
    const totalProducts = await db.Product.count();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await db.Product.findAll({
      limit,
      offset,
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${product_name}%`,
        },
      },
    });
    const result = {
      success: true,
      total_product: totalProducts,
      total_page: totalPages,
      current_page: page,
      products,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductHome,
  getProductDetail,
  getProductDetailCart,
  getProductSearch,
};
