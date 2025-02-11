const router= require('express').Router()
const { login } = require('../Authentication/Login')
const SignUp = require('../Authentication/SignUp')
const updatePassword = require('../Authentication/UpdatePassword')
const verify = require('../Authentication/Verify')
const AskedQuestion = require('../Mail/Question')


router.post("/", login)
router.put("/update_password", updatePassword)
router.post("/sign_up", SignUp)
router.post("/verify-otp", verify)
router.post("/asked_question", AskedQuestion)

module.exports= router