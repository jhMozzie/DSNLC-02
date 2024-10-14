const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser,
  editUser,
  login,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);

router.put("/:id", editUser);

router.post("/login", login);

router.get("/", getUsers);

router.delete("/:id", deleteUser);

module.exports = router;
