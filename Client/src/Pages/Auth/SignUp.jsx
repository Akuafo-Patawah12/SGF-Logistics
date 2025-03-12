import React, { useState,useEffect ,useMemo} from 'react';
import {useNavigate} from "react-router-dom"
import './Auth.css'; // Import the CSS file
import axios from "axios"
import { Link } from "react-router-dom";
import { ReactComponent as SvgIcon } from "../../Icons/svgl_svg_format_2.svg"
import { Form, Input, Button, Typography, Card ,message } from "antd";
const { Title, Text } = Typography;


const SignUp = ({slide}) => {


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    account_type:"User",
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);


 const navigate= useNavigate()

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  
  const handleSubmit = async() => {
    
    setLoading(true);
    try{
     
     

      
      const validationErrors = {};
    // Validation (you can expand this further)
    
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors); // Return all validation errors
    }


    const response = await axios.post("https://api.sfghanalogistics.com/sign_up", {formData})

    if(response.status===403) validationErrors.email="Email already exist"
    

    // If there are no validation errors, show success message
    if (Object.keys(validationErrors).length === 0) {
      if(response.data.message==="Signed up successful")
      setSuccess(true);
     message.success("Sign up successful")
      navigate("/Auth/login")
      
      
    }

  }catch(error){
     
    console.log(error)
  } finally {
    setLoading(false);
  }
    
  };

  return (
    <div className="form-container form_cont2">
         <header className='auth_header'>
           <Link to={"/"} ><SvgIcon style={{marginTop:"9px"}}/></Link>
           <Link to={"/Auth/login"}><h3>Login</h3></Link>
         </header> 
    <section className="auth_section">
    <Card className="auth_card ">


    <Form layout="vertical" onFinish={handleSubmit} className="signup-form">
      {/* Username Input */}
      <Form.Item label="Username" validateStatus={errors.username ? "error" : ""} help={errors.username}>
        <Input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          style={{height:"45px"}}
          onFocus={slide}
        />
      </Form.Item>

      {/* Email Input */}
      <Form.Item label="Email" style={{fontWeight:"small"}} validateStatus={errors.email ? "error" : ""} help={errors.email}>
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          style={{height:"45px"}}
          
        />
      </Form.Item>

      {/* Password Input */}
      <Form.Item label="Password" style={{fontWeight:"small"}} validateStatus={errors.password ? "error" : ""} help={errors.password}>
        <Input.Password
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          style={{height:"45px"}}
        />
      </Form.Item>

      {/* Confirm Password Input */}
      <Form.Item label="Confirm Password" style={{fontWeight:"small"}} validateStatus={errors.confirmPassword ? "error" : ""} help={errors.confirmPassword}>
        <Input.Password
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{height:"45px"}}
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" style={{background:'var(--purple)',height:"45px"}} htmlType="submit" loading={loading} block>
          Sign Up
        </Button>
      </Form.Item>

      {/* Login Link */}
      <Text>
        Already have an account? <Link to="/Auth/login">Login</Link>
      </Text>

      {/* Success Message */}
      {success && <Text type="success" style={{ display: "block", textAlign: "center", marginTop: 10 }}>Sign-up successful!</Text>}
    </Form>
  </Card>
  </section>
  </div>
     
    
  );
};

export default SignUp;
