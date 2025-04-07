import sequelize from "../db/index.js";
import User from "./user.js";
import Order from "./Order.js";
import Product from "./Product.js";
import Category from "./Category.js";
import OrderContent from "./OrderContent.js";

// User -> Order (One-to-Many)
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Category -> Product (One-to-Many)
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// Order -> Product (Many-to-Many via OrderContent)
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

// OrderProduct -> Order (Many-to-One)
Order.hasMany(OrderContent, { foreignKey: "orderId", as: "products" });
OrderContent.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// OrderProduct -> Product (Many-to-One)
Product.hasMany(OrderContent, { foreignKey: "productId", as: "orderContents" });
OrderContent.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Sync all models with the database
sequelize.sync();

export { Product, Order, OrderContent, Category, User };
