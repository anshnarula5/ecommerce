const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const loginController = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        res.status(404)
        throw new Error("No user found")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(401)
        throw new Error("Invalid credentials")
    }
    const id = user._id
    const token = jwt.sign({id}, "secret", {expiresIn: 360000})
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token
    })
})

module.exports = loginController