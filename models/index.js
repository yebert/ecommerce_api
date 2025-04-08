import sequelize from "../db/index.js";
import User from "./user.js";
import Order from "./Order.js";
import Product from "./Product.js";
import Category from "./Category.js";
import OrderContent from "./OrderContent.js";

// Order, OrderContent, Product relationships
Product.hasMany(OrderContent, { foreignKey: "productId", as: "orderContents" });
OrderContent.belongsTo(Product, { foreignKey: "productId", as: "product" });
Order.hasMany(OrderContent, { foreignKey: "orderId", as: "products" });
OrderContent.belongsTo(Order, { foreignKey: "orderId", as: "order" });
Order.belongsToMany(Product, {
  through: OrderContent,
  foreignKey: "orderId",
  as: "contentProducts",
});
Product.belongsToMany(Order, {
  through: OrderContent,
  foreignKey: "productId",
  as: "orders",
});

// User relationships
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Product-Category relationships
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

sequelize.sync();

export { Product, Order, OrderContent, Category, User };
