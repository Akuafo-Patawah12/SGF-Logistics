const router= require('express').Router()
const multer= require("multer")
const fs = require("fs");
const path = require("path");
const { login } = require('../Authentication/Login')
const SignUp = require('../Authentication/SignUp')
const updatePassword = require('../Authentication/UpdatePassword')
const verify = require('../Authentication/Verify')
const AskedQuestion = require('../Mail/Question')
const pdf = require ("../SendPDF")




const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", login)
router.put("/update_password", updatePassword)
router.post("/sign_up", SignUp)
router.post("/verify-otp", verify)
router.post("/asked_question", AskedQuestion)
router.post("/send-pdf", upload.single("pdf"), pdf)

module.exports= router