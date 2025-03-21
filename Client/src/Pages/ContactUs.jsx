import { Form, Input, Button, Row, Col, Card, Typography , message} from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios"
import {useState} from "react"
const { Title, Text ,Paragraph} = Typography;

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
       <div className="contact-section">
      <Card className="contact-card">
        <Title level={2} className="contact-title">Contact SF Ghana Logistics</Title>
        <Paragraph className="contact-description" style={{fontSize:"16px"}}>
          At SF Ghana Logistics, we are committed to providing fast, reliable, and affordable shipping solutions tailored to your needs.  
          Whether you require sea freight, air freight, door-to-door delivery, or free procurement services, our expert team is here to assist you every step of the way.
        </Paragraph>
        
       
      </Card>
    </div>
    <Row justify="center" style={{ minHeight: "100vh",marginInline:"auto", width:"95%",background: "#f5f5f5", padding: "40px 20px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          style={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          
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
