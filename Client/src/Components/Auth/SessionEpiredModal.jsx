import React, {  useEffect } from "react";
import { Modal, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";



const SessionExpiredModal = ({isModalOpen,setIsModalOpen}) => {
  const { Title, Paragraph } = Typography;
  const navigate = useNavigate();

 

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/Auth/login"); // Redirect to login page
  };

  return (
    <Modal
    open={isModalOpen}
    footer={null} // No default footer buttons
    closable={false} // Hide close button
    centered // Center modal on screen
  >
    <div style={{ textAlign: "center", padding: "20px" }}>
      <LockOutlined style={{ fontSize: "50px", color: "#faad14" }} />
      <Title level={3}>Login Expired</Title>
      <Paragraph>Your session has expired, Please login to continue.</Paragraph>
      <Button type="primary" size="large" onClick={handleOk}>
        Login
      </Button>
    </div>
  </Modal>
  );
};

export default SessionExpiredModal;
