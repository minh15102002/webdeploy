"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
      Product.belongsTo(models.Brand, {
        foreignKey: "BrandId",
      });
      Product.belongsToMany(models.Order, { through: "Order_Product" });
      Product.hasMany(models.Order_Product, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      BrandId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
