import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/user.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new ErrorResponse("name, email, password are required", 400);
  const found = await User.findOne({ where: { email } });
  if (found)
    throw new ErrorResponse("User with that email already exists", 409);
  const user = await User.create(req.body);
  const userOhnePassword = { ...user.toJSON() };
  delete userOhnePassword.password;
  res.json(userOhnePassword);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.update(
      { name, email, password },
      { where: { id }, returning: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "User successfully updated.", data: user[1] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await User.destroy({ where: { id } });
    res.json({ message: "User successfully deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
