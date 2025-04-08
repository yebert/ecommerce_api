import { Order, OrderContent, Product } from "../models/index.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [
      {
        model: OrderContent,
        as: "products",
      },
    ],
  });

  const fullOrders = orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    products: order.products.map((orderContent) => ({
      productId: orderContent.productId,
      quantity: orderContent.quantity,
    })),
    total: order.total,
  }));

  res.json(fullOrders);
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id, {
    include: [
      {
        model: OrderContent,
        as: "products",
      },
    ],
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  const fullOrder = {
    id: order.id,
    userId: order.userId,

    products: order.products.map((orderContent) => ({
      productId: orderContent.productId,
      quantity: orderContent.quantity,
    })),
    total: order.total,
  };

  res.json(fullOrder);
};

export const createOrder = async (req, res) => {
  const { userId, products } = req.body;
  let total = 0;
  const order = await Order.create({ userId, total });

  if (!order) {
    return res.status(400).json({ message: "Failed to create order" });
  }

  for (const item of products) {
    const product = await Product.findByPk(item.productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${item.productId} not found` });
    }

    await OrderContent.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    });

    total += product.price * item.quantity;
  }

  await order.update({ total });

  const newOrder = await Order.findByPk(order.id, {
    include: {
      model: OrderContent,
      as: "products",
      attributes: ["productId", "quantity"],
    },
    attributes: ["id", "userId", "total"],
  });

  res.status(201).json(newOrder);
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const findProductById = async (productId) => {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ErrorResponse(`Product with ID ${productId} not found`, 404);
    }
    return product;
  };

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  await OrderContent.destroy({ where: { orderId: id } });

  let total = 0;

  for (const item of products) {
    const product = await findProductById(item.productId);
    await OrderContent.create({
      orderId: id,
      productId: item.productId,
      quantity: item.quantity,
    });

    total += product.price * item.quantity;
  }

  await order.update({ total });

  const updatedOrder = await Order.findByPk(id, {
    include: {
      model: OrderContent,
      as: "products",
      attributes: ["productId", "quantity"],
    },
    attributes: ["id", "userId", "total"],
  });

  res.json(updatedOrder);
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  await OrderContent.destroy({ where: { orderId: id } });
  await order.destroy();

  res.json({ message: "Order deleted successfully" });
};
