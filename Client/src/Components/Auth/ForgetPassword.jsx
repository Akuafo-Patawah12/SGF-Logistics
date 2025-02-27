import React,{useState} from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { ReactComponent as SvgIcon } from "../../Icons/svgl_svg_format_2.svg"
import {Link} from "react-router-dom"
import './Auth.css'; 
import axios from "axios"



const ForgotPassword = () => {
  const { Title, Text } = Typography;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");
  const onFinish = async() => {
    setLoading(true);
    try {
      const res = await axios.post("https://api.sfghanalogistics.com/forget_password", { email });

      if(res.status===200){
      message.success("Password reset email sent")
      }
    } catch (error) {
      if(error.message==="Request failed with status code 429"){
        message.error("Too many attempts, try in 5 minutes")
        return
      }
      setMessage(error.response.message);
    }finally {
        setLoading(false);
      }
  };

  return (
    <div className="form-container">
         <header className='auth_header'>
           <Link to={"/"}><SvgIcon/></Link>
           <h3>Sign up</h3>
         </header> 
      <Card className="auth_card">
        <Title level={3} className="title">Forgot Password</Title>
        <Text className="subtitle">Enter your email to receive a reset link</Text>

        <Form
          name="forgotPassword"
          onFinish={onFinish}
          layout="vertical"
          className="forgot-password-form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" }
            ]}
          >
            <Input placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{background:'var(--purple)',height:"45px"}} loading={loading} block>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
