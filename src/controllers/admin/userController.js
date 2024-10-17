const db = require("../../models/index");

const indexUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: users } = await db.User.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await db.User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return res.status(404).json({
        detail: "Không tồn tại người dùng !",
      });
    }
    const user_order = await db.Order.findOne({
      where: {
        UserId: user_id,
      },
    });
    if (user_order) {
      return res.status(409).json({
        detail: `Thông tin người dùng đang tồn tại ở đơn hàng ID:${user_order.id}`,
      });
    }
    await db.User.destroy({
      where: {
        id: user_id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa người dùng thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await db.User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return res.status(404).json({
        detail: "Không tồn tại người dùng !",
      });
    }
    await db.User.update(
      {
        RoleId: 1,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Ủy quyền người dùng thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const cancelRole = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await db.User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return res.status(404).json({
        detail: "Không tồn tại người dùng !",
      });
    }
    await db.User.update(
      {
        RoleId: 2,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Hủy quyền người dùng thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  indexUser,
  updateUser,
  deleteUser,
  cancelRole,
};
