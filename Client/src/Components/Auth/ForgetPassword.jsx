import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { ReactComponent as SvgIcon } from "../../Icons/svgl_svg_format_2.svg"
import {Link} from "react-router-dom"
import './Auth.css'; 
import axios from "axios"

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Password reset link has been sent to your email.");
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
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
