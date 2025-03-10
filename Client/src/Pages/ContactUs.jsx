import { Form, Input, Button, Row, Col, Card, Typography , message} from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios"
import {useState} from "react"
const { Title, Text } = Typography;

const ContactUs = () => {
  const [formData,setFormData]= useState({
    name:"",
    email:"",
    message:""
  })
  const onFinish = async() => {
    try{
    const response = await axios.post("https://api.sfghanalogistics.com/contact_us", {formData})
    if ( response.status===200){
      message.success(response.data.message)
    }else{
      message.error("Oops, something went wrong")
       
    }
    
    
  }catch(error){
    if(error.message==="Request failed with status code 429"){
      message.error("Too many attempts, try in 5 minutes")
      return
    }
    message.error("Oops, something went wrong")
  }
    
  
}

  return (
    <Row justify="center" style={{ minHeight: "100vh", background: "#f5f5f5", padding: "40px 20px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          style={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          title={<Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>Contact Us</Title>}
        >
          <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: "20px" }}>
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </Text>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Andrew Patawah" value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})} />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input placeholder="example@email.com" value={formData.email} onChange={(e)=> setFormData({...formData, email: e.target.value})} />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} placeholder="Write your message here..." value={formData.message} onChange={(e)=> setFormData({...formData, message: e.target.value})}  />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{background:'var(--purple)'}} block>
                Send Message
              </Button>
            </Form.Item>
          </Form>

          {/* Contact Info Section */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <Text strong>Or reach us at:</Text>
            <div style={{ marginTop: "10px" }}>
              <PhoneOutlined style={{transform:"rotate(90deg) translate(4px, 0)"}}/> <Text type="secondary">020 811 6360 / 053 948 0433</Text>
            </div>
            <div>
              <MailOutlined /> <Text type="secondary">sfghanalogistics24@gmail.com</Text>
            </div>
            <div>
              <EnvironmentOutlined /> <Text type="secondary">George Bush Highway, Dzorwulu, Accra-Ghana</Text>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ContactUs;
