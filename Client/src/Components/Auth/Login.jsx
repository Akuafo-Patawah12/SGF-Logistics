import React,{useState} from 'react'
import './Auth.css'; 
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import ButtonLoader from '../../Icons/ButtonLoader';
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { ReactComponent as SvgIcon } from "../../Icons/svgl_svg_format_2.svg"

const { Title, Text } = Typography;


const Login = ({getEmail}) => {
    const [formData, setFormData] = useState({
        email: '',
        account_type:"User",
        password: '',
        rememberMe:false
       
      });
    
      const [errors, setErrors] = useState({});
      const [success, setSuccess] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      // Validation (you can expand this further)
      const validationErrors = {};

      const handleFocus = () => {
        setErrors("");
      };

      const [loader,setLoader]= useState(false)
      const navigate= useNavigate()
      const handleSubmit = async() => {
        
        setLoader(true)

       try{

        const response = await fetch("http://localhost:4040", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({formData}), // example payload
          credentials: 'include'  // This ensures cookies are sent with the request
        });
    
        const data = await response.json();

        
        
        
        
        
        if (!formData.email) {
          validationErrors.email = "Email is required";
          setLoader(false)
          return setErrors(validationErrors)
        }

        if (!formData.password){
          validationErrors.password = "Password is required";
          setLoader(false)
           return setErrors(validationErrors)
    }
        if (response.status===400){
           validationErrors.password="Invalid accout type"
           setLoader(false)
           return setErrors(validationErrors)
        }
       
        if (response.status===404) {
          validationErrors.password = "Email doesn't exist";
          setLoader(false)
          return
        }

        if(response.status===402){
          getEmail(formData.email)
          navigate("/verify")
          return 
      }

        if (response.status===401){
          validationErrors.password = "Invalid password";
          setLoader(false)
       }

       
    
        setErrors(validationErrors);
    
        // If there are no validation errors, show success message
        if (Object.keys(validationErrors).length === 0) {
          if(data.message==="Logged in as a client" ){
            setLoader(false)
          setSuccess(true);
         
          navigate(`/Invoice`)
          
          }
          if(data.message==="Logged in as an admin"){
            setLoader(false)
          setSuccess(true);
          localStorage.setItem('accesstoken', data.accessToken);
          navigate("/AdminDashboard")
        }
      }

        

      }catch(error){
        setLoader(false)
        console.error(error)
        if (error.response && error.response.status === 404) {
          validationErrors.email = "Email doesn't exist";
          setLoader(false)
        }
        setErrors(validationErrors);
        
      }
      };
  return (
    <div className="form-container">
     <header className='auth_header'>
       <SvgIcon/>
     </header> 
     <Card style={{ maxWidth: 400, margin: "auto",  }}>
      <Title level={3} style={{ textAlign: "center" }}>Login</Title>

      <Form layout="vertical" onFinish={handleSubmit} className="login-form">
        {/* Email Input */}
        <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email}>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onFocus={handleFocus}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Password Input */}
        <Form.Item label="Password" validateStatus={errors.password ? "error" : ""} help={errors.password}>
          <Input.Password
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onFocus={handleFocus}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Remember Me Checkbox */}
        <Form.Item>
          <Checkbox
            name="rememberMe"
            checked={formData.rememberMe}
            onFocus={handleFocus}
            onChange={handleChange}
          >
            Stay Signed in
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={loader}>
            {loader ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>

        {/* Signup Link */}
        <Text>
          Don't have an account? <Link to="/Auth/sign_up">Sign Up</Link>
        </Text>

        {/* Success Message */}
        {success && <Text type="success" style={{ display: "block", textAlign: "center", marginTop: 10 }}>Login successful!</Text>}
      </Form>
    </Card>
  </div>
  )
}

export default Login