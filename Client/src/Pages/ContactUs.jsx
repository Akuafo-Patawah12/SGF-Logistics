import { Form, Input, Button, Row, Col, Card, Typography , message} from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios"
import { Helmet } from "react-helmet-async";
import {useState} from "react"
const { Title, Text ,Paragraph} = Typography;
import "../Styles/Contact.css"
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
    <div>
       <Helmet>
        <title>Contact Us - SF Ghana Logistics</title>
        <meta name="description" content="Get in touch with SF Ghana Logistics for inquiries about our shipping, freight, and logistics services. Reach out via email, phone, or visit our office for assistance." />
      </Helmet>

    <Row justify="center" style={{ minHeight: "100vh",borderRadius: "10px",marginInline:"auto", width:"95%",background: "#f5f5f5", padding: "40px 20px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          style={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          title={<Title level={3} style={{ textAlign: "center", color: "#222" }}>Contact Us</Title>}
        >
          <Text style={{ display: "block",fontSize:"15px", textAlign: "center", marginBottom: "20px", color: "#222" }}>
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </Text>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<Text style={{ color: "#333" }}>Full Name</Text>}
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Andrew Patawah" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Form.Item>

            <Form.Item
              label={<Text style={{ color: "#333" }}>Email Address</Text>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input placeholder="example@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Item>

            <Form.Item
              label={<Text style={{ color: "#333" }}>Message</Text>}
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} placeholder="Write your message here..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: "var(--purple)" }} block>
                Send Message
              </Button>
            </Form.Item>
          </Form>

          {/* Contact Info Section */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <Text strong style={{ color: "#222" }}>Or reach us at:</Text>
            <div style={{ marginTop: "10px" }}>
              <PhoneOutlined style={{ transform: "rotate(90deg) translate(4px, 0)" }} />
              <Text style={{ color: "#222",fontSize:"15px" }}> 020 811 6360 / 053 948 0433</Text>
            </div>
            <div>
              <MailOutlined /> <Text style={{ color: "#222",fontSize:"15px" }}> sfghanalogistics24@gmail.com</Text>
            </div>
            <div >
              <EnvironmentOutlined />  <Text style={{ color: "#222",fontSize:"15px" }}>Kwei Okyerema St, Dzorwulu Accra</Text>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    </div>
  );
};

export default ContactUs;
