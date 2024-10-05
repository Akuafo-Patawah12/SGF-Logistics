const router= require('express').Router()
const { login } = require('../Authentication/Login')
const updatePassword = require('../Authentication/UpdatePassword')


router.post("/", login)
router.put("/update_password", updatePassword)

module.exports= router