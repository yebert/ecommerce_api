import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import validateOrder from "../middleware/validateOrder.js";
import OrderSchema from "../schemas/OrderSchema.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(getOrders)
  .post(validateOrder(OrderSchema), createOrder);
orderRouter
  .route("/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

export default orderRouter;
