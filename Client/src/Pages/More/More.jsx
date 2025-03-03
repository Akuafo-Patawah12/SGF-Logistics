import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import "./More.css"
import {
  TagOutlined,
  PictureOutlined,
  LockOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const More = () => {
  const navigate = useNavigate();

  const options = [
    { label: "Pricing", path: "/More/pricing", icon: <TagOutlined /> },
    { label: "Gallery", path: "/More/Gallery", icon: <PictureOutlined /> },
    { label: "Privacy Policy", path: "/More/Privacy", icon: <LockOutlined /> },
    { label: "FAQs", path: "/More/FAQs", icon: <QuestionCircleOutlined /> },
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Space direction="vertical" size="large" className="more_grid">
        {options.map((option, index) => (
          <Button
            key={index}
            type="primary"
            size="large"
            icon={option.icon}
            style={{
              
              marginInline:"auto",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
            className="more_btn"
            onClick={() => navigate(option.path)}
          >
            {option.label}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default More;
