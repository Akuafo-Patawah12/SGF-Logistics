const user= require("../Models/UsersSchema")
const UAParser= require("ua-parser-js");
const sendCookie = require("../Utils/Cookie");


  
  // **2️⃣ Verify OTP**
  const verify= async (req, res) => {
    const { email, otp } = req.body;

    const userAgent = req.headers["user-agent"];
           const parser = new UAParser(userAgent);
           
           
           const deviceInfo = {
             device: parser.getDevice().model || "Unknown Device",
             brand: parser.getDevice().vendor || "Unknown Brand",
             type: parser.getDevice().type || "PC",
             os: parser.getOS().name + " " + parser.getOS().version,
             browser: parser.getBrowser().name + " " + parser.getBrowser().version,
             Agent: userAgent,
           };
           console.log(deviceInfo)
           const {device,brand,type,os,browser,Agent}=deviceInfo
         const userDeviceInfo = `${device},${brand},${type},${os},${browser},${Agent}`; // User's device info
    console.log({ email, otp })
    try{

    const record = await user.findOne({ email });
  
    if (!record) {
      return res.status(404).json({ success: false, message: "OTP not found!" });
    }

    const payload = {
        id: record._id, // Example user ID
        role: record.accountype,
        iat: Math.floor(Date.now() / 1000) // Set issued at timestamp
        
      };
    

    if (record.verification_code === null || record.verification_code !== parseInt(otp)) {
        return res.status(403).json({ success: false, message: "Invalid OTP!" });
    }
    

    if (record.code_expires_at < new Date()) {
      return res.status(401).json({ success: false, message: "OTP expired!" });
    }
  
    
  
    // OTP verified, delete from DB
    record.verification_code= null
    record.code_expires_at=null
    if (!record.device_info.includes(userDeviceInfo)) {
        record.device_info.push(userDeviceInfo);
    }
    await record.save()
    let rememberMe=true;
    await sendCookie(payload,rememberMe,res)

    if(record.account_type==="User"){
      res.status(200).json({ success: true, message: "OTP verified!" });
    }else{
        res.status(201).json({ success: true, message: "Verified!" })
    }

}catch(err){
    console.log(err)
    return res.status(500).json({message:"Internal server error",err})
}
  }

  module.exports= verify