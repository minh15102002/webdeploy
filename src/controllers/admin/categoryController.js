const db = require("../../models/index");

const indexCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: categories } = await db.Category.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      categories: categories,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeCategory = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({
        detail: "Vui lòng điền đầy đủ thông tin !",
      });
    }
    let category = await db.Category.create({
      name: name,
    });
    return res.status(200).json({
      success: true,
      message: "Thêm danh mục sản phẩm thành công !",
      category: category,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategoy = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const category = await db.Category.findOne({
      where: { id: category_id },
    });
    if (!category) {
      return res.status(404).json({
        detail: "Không tồn tại danh mục sản phẩm !",
      });
    }
    const product = await db.Product.findOne({
      where: {
        CategoryId: category_id,
      },
    });
    if (product) {
      return res.status(409).json({
        detail: `Danh mục hiện đang tồn tại trong sản phẩm ID:${product.id}`,
      });
    }
    await db.Category.destroy({
      where: {
        id: category_id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa danh mục sản phẩm thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  storeCategory,
  indexCategory,
  deleteCategoy,
};
