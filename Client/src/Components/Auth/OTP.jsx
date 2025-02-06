import { useState, useRef } from "react";
import "./Auth.css"; // Import the CSS file
import { ReactComponent as SvgIcon } from "../../Icons/svgl_svg_format_2.svg"
import axios from "axios"

const OTP = ({email}) => {
  

  
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);

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
    if (e.key === "Backspace") {
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
      const response = await axios.post("http://localhost:4040/verify-otp", {
        email,
        otp: enteredOtp,
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed!");
    }
  };
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      verifyOTP(pasteData); // Auto-send OTP when pasting
    }
  };


  return (
    <div className="otp_background">
    <div className="otp-container">
    <span><SvgIcon/></span>
    <div class="verification-container">
  <h3>Enter Verification Code</h3>
  <p>We have sent a code to <span class="email-text">burxells873@gmail.com</span></p>
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
          onPaste={handlePaste}
          className="otp-input"
        />
      ))}
    </div>
    <div class="resend-container">
  <p>Didn't receive a code? <button class="resend-btn">Click to resend</button></p>
</div>
</div>
    </div>
  );
};

export default OTP;