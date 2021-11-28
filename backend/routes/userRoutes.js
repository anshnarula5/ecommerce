const express = require("express")
const {loginController, getProfileController, registerController} = require("../controllers/user")
const auth = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/login", loginController)
router.get("/profile", auth, getProfileController)
router.post("/", registerController)

module.exports = router