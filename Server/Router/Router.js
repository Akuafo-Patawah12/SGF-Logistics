const router= require('express').Router()
const multer= require("multer")
const fs = require("fs");
const path = require("path");
const rateLimit = require("express-rate-limit");
const { login } = require('../Authentication/Login')
const SignUp = require('../Authentication/SignUp')
const updatePassword = require('../Authentication/UpdatePassword')
const verify = require('../Authentication/Verify')
const AskedQuestion = require('../Mail/Question')
const pdf = require ("../SendPDF");
const resendOtp = require('../Authentication/ResendOTP');
const contactUs = require('../Mail/Contact');

const forgetPassword = require('../Authentication/ForgetPassword');


const signUpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3, // Max 3 sign-ups per IP in 10 minutes
    message: { error: "Too many sign-up attempts. Try again later." },
  });

const Limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Limit to 5 login attempts per IP
    message: { error: "Too many requests. Try again later." }, 
  });




const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/",Limiter, login)
router.put("/reset-password/:token",Limiter, updatePassword)
router.post("/forget_password",Limiter,forgetPassword)
router.post("/sign_up",signUpLimiter, SignUp)
router.post("/verify-otp",Limiter, verify)
router.post("/asked_question", AskedQuestion)
router.post("/send-pdf", upload.single("pdf"), pdf)
router.post("/resend-otp",Limiter, resendOtp)
router.post("/contact_us",Limiter, contactUs)


module.exports= router