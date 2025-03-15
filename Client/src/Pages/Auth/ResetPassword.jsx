import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Card, Typography, message } from "antd";
import  SvgIcon  from "../../Icons/svgl_svg_format_2.svg"

import {Link} from "react-router-dom"
import './Auth.css'; 

const { Title } = Typography;

const ResetPassword = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(`https://api.sfghanalogistics.com/reset-password/${token}`, {
        newPassword: values.newPassword,
      });
      
      if(res.status===200){
      message.success(res.data.message);
      navigate("/Auth/login")
      }
    } catch (error) {
      if (error.response) {
        // Switch statement to handle different status codes
        switch (error.response.status) {
            case 429:
                message.error("Too many attempts, try in 5 minutes");
                break;
            case 404:
            case 400:
                message.error(error.response.data.message || "Invalid or expired reset token");
                break;
            default:
                message.error(error.response.data.message || "Something went wrong");
        }
    } else if (error.request) {
        message.error("No response from server. Please try again later.");
    } else {
        message.error(error.message || "Something went wrong");
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
         <header className='auth_header'>
           <Link to={"/"}><img src={SvgIcon} alt="SVG Icon" /></Link>
           <Link to={"/Auth/login"}><h3>Login</h3></Link>
         </header>
    <section className="auth_section">
      <Card style={{ width: 400, textAlign: "center" }}>
        <Title level={3}>Reset Password</Title>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password placeholder="Enter new password" style={{height:"45px"}}/>
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{background:'var(--purple)',height:"45px"}} block loading={loading}>
            Reset Password
          </Button>
        </Form>
      </Card>
      </section>
    </div>
  );
};

export default ResetPassword;
