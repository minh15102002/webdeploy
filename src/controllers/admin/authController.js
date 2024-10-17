const db = require("../../models/index");
const bcrypt = require("bcrypt");
const JWT = require("../../middleware/middleware");

const checkPassword = async (password, hashedPassword) => {
  const checkPass = await bcrypt.compare(password, hashedPassword);
  return checkPass;
};

const loginAmin = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        detail: "Vui lòng điền đầy đủ thông tin đăng nhập !",
      });
    } else {
      let username = req.body.username;
      let password = req.body.password;
      let user = await db.User.findOne({
        where: { username: username },
      });
      if (!user) {
        return res.status(404).json({
          detail: "Tên đăng nhập không tồn tại !",
        });
      } else {
        let isPasswordExit = await checkPassword(password, user.password);
        if (!isPasswordExit) {
          return res.status(401).json({
            detail: "Mật khẩu không đúng vui lòng kiểm tra lại !",
          });
        } else {
          if (user.RoleId === 1) {
            let dataUser = {
              id: user.id,
              name: user.name,
            };
            let userRes = {
              id: user.id,
              name: user.name,
              username: user.username,
            };
            let token = JWT.createJWT(dataUser);
            // res.cookie("jwt", token, {
            //   maxAge: 24 * 60 * 60 * 1000,
            // });
            return res.status(200).json({
              success: true,
              message: "Đăng nhập thành công !",
              token: token,
              user: userRes,
            });
          } else {
            return res.status(403).json({
              detail: "Không có quyền truy cập !",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const authAdmin = async (req, res) => {
  try {
    let token = req.params.token;
    let decoded = JWT.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        detail: "Xác thực thất bại !",
      });
    }
    let id = decoded.id;
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user && user.RoleId === 1) {
      return res.status(200).json({
        success: true,
        message: "Xác thực đăng nhập admin thành công !",
      });
    } else if (user && user.RoleId === 2) {
      return res.status(403).json({
        detail: "Bạn không có quyền truy cập !",
      });
    } else {
      return res.status(403).json({
        detail: "Quyền truy cập không được hỗ trợ !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginAmin,
  authAdmin,
};
