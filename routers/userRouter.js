import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { UserSchema } from "../schemas/UserSchema.js";
import validateUser from "../middleware/validateUser.js";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(validateUser(UserSchema), createUser);
userRouter.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// userRouter.post("/", validateSchema(UserSchema), createUser);

export default userRouter;
