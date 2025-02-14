
const fs = require("fs");
const path = require("path")
const nodemailer= require("nodemailer")

require("dotenv").config()






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

const pdf = async (req, res) => {
  try {
    const { email } = req.body; // Get user email
    const pdfBuffer = req.file.buffer; // Get PDF file
    console.log(email,"my email")
    console.log("hello buffer",pdfBuffer)

    

    
    // Send Email
    await transporter.sendMail({
      from: `"SF Ghana Logistics" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Invoices",
      text: "Please find your invoices attached.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
        },
      ],
    });

    res.status(200).json({ message: "Emails sent and PDFs deleted!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
};


module.exports = pdf