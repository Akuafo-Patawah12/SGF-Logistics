const router= require('express').Router()
const { login } = require('../Authentication/Login')
const SignUp = require('../Authentication/SignUp')
const updatePassword = require('../Authentication/UpdatePassword')
const AskedQuestion = require('../Mailer/Question')


router.post("/", login)
router.put("/update_password", updatePassword)
router.post("/sign_up", SignUp)
router.post("/asked_question", AskedQuestion)

module.exports= router