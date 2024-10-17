const db = require("../../models/index");

const indexOrder = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: orders } = await db.Order.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      orders: orders,
    });
  } catch (error) {
    console.log(error);
  }
};

const confirmOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const order = await db.Order.findOne({
      where: {
        id: order_id,
      },
    });
    if (!order) {
      return res.status(404).json({
        detail: "Không tồn tại đơn hàng",
      });
    }
    await db.Order.update(
      {
        status: 1,
      },
      {
        where: { id: order_id },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Duyệt đơn hàng thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const order = await db.Order.findOne({
      where: {
        id: order_id,
      },
    });
    if (!order) {
      return res.status(404).json({
        detail: "Không tồn tại đơn hàng",
      });
    }
    await db.Order.destroy({
      where: {
        id: order_id,
      },
    });
    await db.Order_Product.destroy({
      where: {
        OrderId: order_id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa đơn hàng thành công !",
    });
  } catch (error) {}
};

module.exports = {
  indexOrder,
  confirmOrder,
  deleteOrder,
};
