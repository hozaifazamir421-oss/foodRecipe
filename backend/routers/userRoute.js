const express = require("express")
const { userSignUp, userLogIn, getUser } = require("../controller/userController")
const router = express.Router()

router.post('/signUp',userSignUp)
router.post('/logIn',userLogIn)
router.get('/user/:id',getUser)

module.exports = router