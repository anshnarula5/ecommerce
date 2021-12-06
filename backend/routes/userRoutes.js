const express = require("express");
const { check } = require("express-validator");
const {
  loginController,
  getProfileController,
  registerController,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  updateUserProfile
} = require("../controllers/user");
const { auth, admin } = require("../middleware/authMiddleware");
const router = express.Router();

const loginValidator = [
  check("email", "Enter correct email").isEmail(),
  check("password", "Enter password of atleast 6 characters")
    .trim()
    .isLength({ min: 6 }),
];
router.post("/login", loginValidator, loginController);
router.get("/profile", auth, getProfileController);
router.put("/profile", auth, updateUserProfile);

const registerValidator = [
  check("email", "Enter correct email").isEmail(),
  check("password", "Enter password of atleast 6 characters")
    .trim()
    .isLength({ min: 6 }),
  check("name", "Enter correct name").trim().not().isEmpty(),
];


router.post("/", registerValidator, registerController);
router.get("/", auth, admin, getAllUsers);
router.delete("/:id", auth, admin, deleteUser);
router.put("/:id", auth, admin, updateUser);
router.get("/:id", auth, admin, getUserById);


module.exports = router;
