import React, { useState, useEffect ,useMemo } from "react";
import { Modal, List, Spin, Avatar ,Tooltip ,message} from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";


const AssignUsersModal = ({ isOpen, onClose ,assignedOrder_id }) => {

    const socket = useMemo(() =>io("https://sfghanalogistics.com/shipment",{
        transports: ["websocket","polling"],
        withCredentials: true,
        secure: true
      }),[])

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      socket.emit("fetchAssignedOrderIds",assignedOrder_id,(response)=>{
        console.log(response.message)
      });

      socket.on("fetchAssignedOrders", (data) => {
        setUsers(data);
        setLoading(false);
      });

      return () => {
        socket.off("assignedUsers");
      };
    }
  }, [isOpen]);

  const handleCopy = (trackingNo) => {
    navigator.clipboard.writeText(trackingNo);
    message.success("Tracking number copied!");
  };

  return (
    <Modal title="Assigned Users" open={isOpen} onCancel={onClose} footer={null}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
        </div>
      ) : users.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
        <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{user.userId.username.charAt(0)}</Avatar>}
        title={user.userId.username}
        description={user.userId.email}
      />
      <div>
        <span style={{fontWeight:"400",fontSize:"14px"}}>{user.items[0].trackingNo}</span>
        <Tooltip title="Copy Tracking No">
          <CopyOutlined
            style={{ marginLeft: 8, cursor: "pointer" }}
            onClick={() => handleCopy(user.items[0].trackingNo)}
          />
        </Tooltip>
      </div>
    </List.Item>
      )}
      />    
      ) : (
        <p style={{ textAlign: "center" }}>No assigned users.</p>
      )}
    </Modal>
  );
};

export default AssignUsersModal;
