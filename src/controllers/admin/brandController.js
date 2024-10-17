const db = require("../../models/index");

const indexBrand = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: brands } = await db.Brand.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      brands: brands,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeBrand = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({
        detail: "Vui lòng điền đầy đủ thông tin !",
      });
    }
    let category = await db.Brand.create({
      name: name,
    });
    return res.status(200).json({
      success: true,
      message: "Thêm thương hiệu sản phẩm thành công !",
      category: category,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand_id = req.params.brand_id;
    const brand = await db.Brand.findOne({
      where: { id: brand_id },
    });
    if (!brand) {
      return res.status(404).json({
        detail: "Không tồn tại thương hiệu sản phẩm !",
      });
    }
    const product = await db.Product.findOne({
      where: {
        BrandId: brand_id,
      },
    });
    if (product) {
      return res.status(409).json({
        detail: `Thương hiệu hiện đang tồn tại trong sản phẩm ID:${product.id}`,
      });
    }
    await db.Brand.destroy({
      where: {
        id: brand_id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa thương sản phẩm thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  storeBrand,
  indexBrand,
  deleteBrand,
};
