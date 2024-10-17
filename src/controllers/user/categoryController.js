const db = require("../../models/index");

const getProductCategory = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    const category_id = req.params.category_id;
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const { count, rows: products } = await db.Product.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: {
        CategoryId: category_id,
      },
    });
    const totalPage = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      products: products,
      categories: categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductCategory,
};
