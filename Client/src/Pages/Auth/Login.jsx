import React,{useState} from 'react'
import './Auth.css'; 
import {Link, useNavigate} from "react-router-dom"
import { Form, Input, Button, Checkbox, Typography, Card, message } from "antd";
import { ReactComponent as SvgIcon } from "../../Icons/svgl_svg_format_2.svg"

const {  Text } = Typography;


const Login = ({getEmail}) => {
    const [formData, setFormData] = useState({
        email: '',
        account_type:"User",
        password: '',
        rememberMe: false
       
      });
    
      const [errors, setErrors] = useState({});
      const [success, setSuccess] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleCheck = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox properly
    }));
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

       try{

        const response = await fetch("https://api.sfghanalogistics.com", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({formData}), // example payload
          credentials: 'include'  // This ensures cookies are sent with the request
        });
    
        const data = await response.json();

        
        
        if (response.status===400){
           validationErrors.password="Invalid accout type"
           setLoader(false)
           return setErrors(validationErrors)
        }
       
        if (response.status===404) {
          validationErrors.email = "Email doesn't exist";
          setLoader(false)
          return setErrors(validationErrors)
        }

        if(response.status===402){
          
          localStorage.setItem("email",formData.email)
          getEmail(formData.email)
          navigate("/verify")

          return 
      }

        if (response.status===401){
          validationErrors.password = "Invalid password";
          setLoader(false)
       }

       if (response.status===429){
        message.error("Too many login attempts. Try again in 5 minutes.")
        setLoader(false)
     }



       
    
        setErrors(validationErrors);
    
        // If there are no validation errors, show success message
        if (Object.keys(validationErrors).length === 0) {
          if(data.message==="Logged in as a client" ){
            setLoader(false)
          setSuccess(true);
           message.success("login successful")
        
            navigate(`/MyOrders`); // Redirect first-time users to Orders

              
          }
          if(data.message==="Logged in as an admin"){
            setLoader(false)
          setSuccess(true);
          message.success("login successful")
         
          navigate("/containers")
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
        
      } finally {
        setLoader(false);
      }
      };
  return (
    <div className="form-container">
     <header className='auth_header'>
       <Link to={"/"}><SvgIcon/></Link>
       <Link to={"/Auth/sign_up"}><h3>Sign up</h3></Link>
     </header> 
     <Card  className="auth_card">
      

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
            style={{height:"45px"}}
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
            style={{height:"45px"}}
          />
        </Form.Item>

        {/* Remember Me Checkbox */}
        <Form.Item>
          <Checkbox
            name="rememberMe"
            onFocus={handleFocus}
            checked={formData.rememberMe}
            onChange={handleCheck}
          >
            Stay Signed in
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{background:'var(--purple)',height:"45px"}} loading={loader} block >
            {loader ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>

        {/* Signup Link */}
        <Text style={{alignSelf:"center"}}>
           <Link to="/Auth/forget_password" style={{fontSize:"14px"}}>Forget password?</Link>
        </Text>
        <Text style={{alignSelf:"center"}}>
          Don't have an account? <Link to="/Auth/sign_up" style={{fontSize:"14px"}}>Sign Up</Link>
        </Text>

        {/* Success Message */}
        {success && <Text type="success" style={{ display: "block", textAlign: "center", marginTop: 10 }}>Login successful!</Text>}
      </Form>
    </Card>
  </div>
  )
}

export default Login