const express = require("express")
const {check} = require("express-validator")
const {loginController, getProfileController, registerController} = require("../controllers/user")
const auth = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/login", loginController)
router.get("/profile", auth, getProfileController)

const registerValidator = [
    check("email", "Enter correct email").isEmail(),
    check("password", "Enter password of atleast 6 characters").trim().isLength({min: 6}),
    check("name", "Enter correct name").trim().not().isEmpty()
]
router.post("/", registerValidator, registerController)

module.exports = router