import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const User = sequelize.define(
  "user",
  {
    // userId: {
    //   primaryKey: true,
    //   type: DataTypes.INTEGER.UNSIGNED,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

User.sync();

export { User };
