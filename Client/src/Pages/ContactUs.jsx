import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ContactUs = () => {
  const onFinish = (values) => {
    console.log("Submitted:", values);
  };

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
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} placeholder="Write your message here..." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Send Message
              </Button>
            </Form.Item>
          </Form>

          {/* Contact Info Section */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <Text strong>Or reach us at:</Text>
            <div style={{ marginTop: "10px" }}>
              <PhoneOutlined /> <Text type="secondary">020 811 6360 / 053 948 0433</Text>
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
