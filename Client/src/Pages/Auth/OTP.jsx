import { useState, useRef, useEffect } from "react";
import "./Auth.css"; // Import the CSS file
import { message } from "antd"
import { useNavigate} from "react-router-dom"
import  SvgIcon  from "../../Icons/svgl_svg_format_2.svg"
import axios from "axios"

const OTP = ({mail}) => {
  

  
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const navigate= useNavigate()
  const inputRefs = useRef([]);
  const[email,setEmail] = useState("")


  useEffect(()=>{

  
  function getEmail(){
    setEmail(localStorage.getItem("email"))
  }
  getEmail()

},[])

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value.charAt(0);
      setOtp(newOtp);
      if (index < 3) inputRefs.current[index + 1]?.focus();
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
    }
    if (newOtp.join("").length === 4) {
        verifyOTP(newOtp.join(""));
      }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.inputType === "deleteContentBackward") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }

      setOtp(newOtp);
    }
  };


  const verifyOTP = async (enteredOtp) => {
    try {
      const response = await axios.post("https://api.sfghanalogistics.com/verify-otp", {
        email: `${email==="" ? mail : email}`,
        otp: enteredOtp
      });

      setTimeout(() => {
        // Clear OTP values after submission
        setOtp(["", "", "", ""]);
    
        // Move focus back to the first input
        inputRefs.current[0]?.focus();
      }, 500);
      
      if(response.status===429){
        message.error("Too many attempts. Try again in 5 minutes.")
        return
     
      }else if(response.status===200){
        navigate(`/MyOrders`)

      }else if(response.status===201){
        navigate("/containers")
      }
      message.success(response.data.message); // Show success message
    } catch (error) {
      if(error.message==="Request failed with status code 403"){
        message.error("Invalid OTP!")
        return
      }
      message.error(error.message || "Verification failed!");
    }
  };
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      verifyOTP(pasteData); // Auto-send OTP when pasting
    }
  };
  async function resendOtp(email) {
    try {
      if (!email) return message.error("Email is required"); 
  
      const response = await axios.post("https://api.sfghanalogistics.com/resend-otp", { email: `${email==="" ? mail : email}` });
  
      if (response.status === 200) {
        message.success(`Verification code sent to ${email}`);
      }
  
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        const { status } = error.response;
        
        if (status === 429) {
          message.error("Too many login attempts. Try again in 5 minutes.");
        } else if (status === 404) {
          message.error("Email not found. Please check and try again.");
        } else {
          message.error("Something went wrong. Please try again.");
        }
      } else {
        message.error("Network error. Please check your connection.");
      }
    }
  }

  return (
    <div className="otp_background">
    
    <div className="otp-container">
    
    <span><img src={SvgIcon} alt="svg-image" /></span>
    <div class="verification-container">
  <h3>Enter Verification Code</h3>
  <p>We have sent a code to <span class="email-text">{email}</span></p>
</div>

    <div className="otp">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onBeforeInput={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="otp-input"
        />
      ))}
    </div>
    <div class="resend-container">
  <p>Didn't receive a code? <button class="resend-btn" onClick={resendOtp}>Click to resend</button></p>
</div>
</div>
    </div>
  );
};

export default OTP;