const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("db_ban_dong_ho", "root", null, {
//   host: "localhost",
//   dialect: "mysql",
// });
const sequelize = new Sequelize('railway', 'root', 'FGVfQAJleEDAdusRjcyEbMRxFyRfQplS', {
  host: 'autorack.proxy.rlwy.net',
  dialect: 'mysql',
  port: 3306,
});
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connection;
