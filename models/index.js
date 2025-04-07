import sequelize from "../db/index.js";
import Product from "./Product.js";
import Category from "./Category.js";

Category.hasMany(Product);
Product.belongsTo(Category);

sequelize.sync();
// sequelize.sync();

export { Product, Category };
