import ErrorResponse from "./utils/ErrorResponse.js";
import cors from "cors";
import express from "express";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import categoryRouter from "./routers/categoryRouter.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err, req, res, next) => {
  process.env.NODE_ENV !== "production" && console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(port, () => console.log(` CRUD API listening on port ${port} `));
