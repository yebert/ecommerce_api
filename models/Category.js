import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  "category",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

Category.sync();

export default Category;
