import React, { useState,useEffect ,useMemo} from 'react';
import {useNavigate} from "react-router-dom"
import './Auth.css'; // Import the CSS file
import axios from "axios"
import { Link } from "react-router-dom";
import { ReactComponent as SvgIcon } from "../../Icons/svgl_svg_format_2.svg"
import { Form, Input, Button, Typography, Card  } from "antd";
const { Title, Text } = Typography;


const SignUp = ({slide}) => {


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    account_type:"User",
    confirmPassword: ''
  });


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


    const response = await axios.post("https://sfghanalogistics.com/sign_up", {formData})

    if(response.status===403) validationErrors.email="Email already exist"
    

    // If there are no validation errors, show success message
    if (Object.keys(validationErrors).length === 0) {
      if(response.data.message==="Signed up successful")
      setSuccess(true);
      navigate("/Auth/login")
      
      
    }

  }catch(error){
     
    console.log(error)
  }
    
  };

  return (
    <div className="form-container">
         <header className='auth_header'>
           <SvgIcon/>
           <h3>Login</h3>
         </header> 
    
    <Card style={{ width: 400, margin: "auto", padding: 20 }}>
    <Title level={3} style={{ textAlign: "center" }}>Sign Up</Title>

    <Form layout="vertical" onFinish={handleSubmit} className="signup-form">
      {/* Username Input */}
      <Form.Item label="Username" validateStatus={errors.username ? "error" : ""} help={errors.username}>
        <Input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Item>

      {/* Email Input */}
      <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email}>
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Item>

      {/* Password Input */}
      <Form.Item label="Password" validateStatus={errors.password ? "error" : ""} help={errors.password}>
        <Input.Password
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Item>

      {/* Confirm Password Input */}
      <Form.Item label="Confirm Password" validateStatus={errors.confirmPassword ? "error" : ""} help={errors.confirmPassword}>
        <Input.Password
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
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
  </div>
     
    
  );
};

export default SignUp;
