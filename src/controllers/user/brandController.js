const db = require("../../models/index");

const getProductBrand = async (req, res) => {
  try {
    const brands = await db.Brand.findAll();
    const brand_id = req.params.brand_id;
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const { count, rows: products } = await db.Product.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: {
        BrandId: brand_id,
      },
    });
    const totalPage = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      products: products,
      brands: brands,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductBrand,
};
