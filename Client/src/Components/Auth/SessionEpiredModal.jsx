import React, {  useEffect } from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

const SessionExpiredModal = ({isModalOpen,setIsModalOpen}) => {
  
  const navigate = useNavigate();

 

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <Modal
      title="Session Expired"
      open={isModalOpen}
      closable={false}
      footer={[
        <Button type="primary" key="login" onClick={handleOk}>
          Login Again
        </Button>,
      ]}
    >
      <p>Your session has expired. Please log in again to continue.</p>
    </Modal>
  );
};

export default SessionExpiredModal;
