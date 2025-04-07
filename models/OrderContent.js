import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const OrderContent = sequelize.define("OrderContent", {
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

export default OrderContent;
