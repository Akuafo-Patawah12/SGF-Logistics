const express= require("express")

const router= express().router()
const multer= require("multer")
const nodemailer= require("nodemailer")
const fs = require("fs");
const path = require("path");
require("dotenv").config()


// Use Multer Memory Storage (No Disk Storage)

const upload = multer({
    storage: (req, file, cb) => {
      if (file.size < 5000000) { // Less than 5MB → use memory storage
        cb(null, multer.memoryStorage());
      } else { // Larger files → use disk storage
        cb(null, multer.diskStorage({
          destination: "./uploads/",
          filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
        }));
      }
    }
  });

// Email Configuration (Gmail SMTP)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,//email that will be sending messages from the server to the client
        pass: process.env.PASSWORD  //generated password form less secured apps from Google
    },
    tls: {
        rejectUnauthorized: false, //do not reject self-signed certificates  
      },
});

router.post("/send-email", upload, async (req, res) => {
  try {
    const emailList = JSON.parse(req.body.emails);
    const pdfFiles = req.files;

    if (!pdfFiles || pdfFiles.length === 0) {
      return res.status(400).json({ error: "No PDFs uploaded" });
    }

    // Prepare attachments
    const attachments = pdfFiles.map((file) => ({
      filename: file.originalname,
      path: file.path, // Use file path
    }));

    // Send Email
    await transporter.sendMail({
      from: `"SF Ghana Logistics" <${process.env.EMAIL}>`,
      to: emailList,
      subject: "Your Invoices",
      text: "Please find your invoices attached.",
      attachments: attachments,
    });

    // 🔥 Delete PDFs After Sending
    pdfFiles.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.json({ message: "Emails sent and PDFs deleted!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
});


module.exports = router