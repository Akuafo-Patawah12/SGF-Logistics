
const nodemailer= require("nodemailer")

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
  
  // Generate a 4-digit OTP
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
  
  // **1️⃣ Send OTP**
  app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
  
    try {
      // Store OTP in DB (delete previous if exists)
      await OTP.deleteMany({ email });
      await OTP.create({ email, otp, expiresAt });
  
      // Send OTP via email
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
      });
  
      res.json({ success: true, message: "OTP sent!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error sending OTP" });
    }
  });
  
  // **2️⃣ Verify OTP**
  app.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    const record = await OTP.findOne({ email });
  
    if (!record) {
      return res.status(400).json({ success: false, message: "OTP not found!" });
    }
  
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired!" });
    }
  
    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }
  
    // OTP verified, delete from DB
    await OTP.deleteOne({ email });
  
    res.json({ success: true, message: "OTP verified!" });
  });