import React, { useState, useEffect ,useMemo } from "react";
import { Modal, List, Avatar, Spin, Tooltip, Input ,message,Row, Col, Card , Button  } from "antd";
import { CopyOutlined, DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";


const AssignUsersModal = ({ isOpen, onClose ,assignedOrder_id ,containerId,handleDownload,setInvoiceData,socket ,socket1 }) => {

    

    

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingIndex ,setLoadingIndex] = useState(null);

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


  useEffect(()=>{
    socket1.on("orderRemovedFromContainer", ( { orderId }) => {
      console.log(orderId)
     
        setUsers(prevOrders => prevOrders.filter(order => order._id !== orderId));
      
    });
    return()=>{
      socket.off("orderRemovedFromContainer")
    }
  },[socket1])

  const removeOrder = (orderId) => {
    socket1.emit("removeOrderFromContainer", { containerId, orderId });
  };

  console.log(users)

  const handleCopy = (trackingNo) => {
    navigator.clipboard.writeText(trackingNo);
    message.success("Tracking number copied!");
  };
  
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users by tracking number
  const filteredUsers = users.filter((user) =>
    user.userId.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.items[0].trackingNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      title ={`Assigned Users in container.  Total of ${users.length} shipments `}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={"80%"} // Ensures good width on desktop
      centered
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
        </div>
      ) : users.length > 0 ? (
        <>
          {/* Search Input */}
          <Input
            placeholder="Search by Tracking Number or Shipping mark"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              marginBottom: "15px",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "16px",
              width: "100%",
            }}
          />

          {/* Filtered List */}
          <List
            itemLayout="vertical"
            dataSource={filteredUsers}
            renderItem={(user,index) => (

              <Card
                hoverable
                style={{
                  marginBottom: "10px",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}

                actions={[
                <div style={{display:"flex",gap:"5px"}}>
                    <Button type="primary" onClick={() => removeOrder(user._id)}>Remove</Button>
                    <Button onClick={()=>{
                      setInvoiceData((prev)=>({...prev,shippingMark: user.userId.username,cbm: user.items[0].cbm,trackingNo: user.items[0].trackingNo,ctn: user.items[0].ctn,amount: user.items[0].amount}))
    
                      setTimeout(() => {
      handleDownload();
      setLoadingIndex(null)
      // Reset state after download
      setInvoiceData({
        shippingMark: null,
        eta: null,
        loadingDate: null,
        containerNumber: null,
        cbmRate: null,
        cbm: null,
        ctn: null,
        amount: null,
        trackingNo:null
      });
    }, 100); 
                    }}

                      icon={loadingIndex===index ? <Spin size="small" style={{transform:"translateY(-3px)"}}/> : <DownloadOutlined style={{ transform: "translateX(2px)" }} />}
                    />
                    </div>
                  ]}
              >
                <List.Item>
                  <Row
                    gutter={[16, 16]}
                    align="middle"
                    justify="space-between"
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {/* Avatar and User Info */}
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{ backgroundColor: "#1890ff", color: "#fff" }}
                          >
                            {user.userId.username.charAt(0)}
                          </Avatar>
                        }
                        title={
                          <strong style={{ fontSize: "16px" }}>
                            {user.userId.username}
                          </strong>
                        }
                        description={
                          <span style={{ fontSize: "14px", color: "#666" }}>
                            {user.userId.email}
                          </span>
                        }
                      />
                    </Col>

                    {/* CTN, CBM, Amount, Tracking No */}
                    <Col xs={24} sm={12} md={4} lg={4} xl={4}>
                      <h4 style={{ marginBottom: "5px", color: "#555" }}>CTN</h4>
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>
                        {user.items[0].ctn}
                      </span>
                    </Col>

                    <Col xs={24} sm={12} md={4} lg={4} xl={4}>
                      <h4 style={{ marginBottom: "5px", color: "#555" }}>CBM</h4>
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>
                        {user.items[0].cbm}
                      </span>
                    </Col>

                    <Col xs={24} sm={12} md={4} lg={4} xl={4}>
                      <h4 style={{ marginBottom: "5px", color: "#555" }}>
                        Amount
                      </h4>
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>
                        ${user.items[0].amount}
                      </span>
                    </Col>

                    {/* Tracking Number */}
                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                      <h4 style={{ marginBottom: "5px", color: "#555" }}>
                        Tracking No.
                      </h4>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#1890ff",
                        }}
                      >
                        {user.items[0].trackingNo}
                      </span>
                      <Tooltip title="Copy Tracking No">
                        <CopyOutlined
                          style={{
                            marginLeft: 8,
                            cursor: "pointer",
                            color: "#1890ff",
                          }}
                          onClick={() => handleCopy(user.items[0].trackingNo)}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </List.Item>
              </Card>
            )}
          />

          {/* No results found */}
          {filteredUsers.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "10px", color: "#888" }}>
              No matching tracking numbers.
            </p>
          )}
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No assigned users.</p>
      )}
    </Modal>
  );
};

export default AssignUsersModal;
