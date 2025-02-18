import React from 'react'
import { Modal, Descriptions, Spin, Button, Typography, Card } from "antd";

const { Title, Text } = Typography;

const UserShipmentData = ({visible, onClose, shipmentData, loading3}) => {
    if (!shipmentData) return null

    const {
        fullname,
        email,
        phone,
        status,
        
        updatedAt,
        selected_country,
        route,
        items = [],
      } = shipmentData;

  return (
    <Modal 
      open={visible} 
      onCancel={onClose} 
      footer={null} 
      width={500} 
      centered
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Shipment Details
      </Title>

      {loading3 ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
          <p>Loading shipment details...</p>
        </div>
      ) : (
        <>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Shipping mark">{fullname}</Descriptions.Item>
            <Descriptions.Item label="Email">{email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
            <Descriptions.Item label="Country">{selected_country}</Descriptions.Item>
            <Descriptions.Item label="Route">{route}</Descriptions.Item>
            <Descriptions.Item label="Status">{status}</Descriptions.Item>
            
            <Descriptions.Item label="Last Updated">
              {new Date(updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          <Title level={4} style={{ marginTop: "20px" }}>Shipment Items</Title>

          {items.map((item, index) => (
            <Card key={index} style={{ marginBottom: "10px", background: "#f9f9f9" }}>
              <Text strong>Description:</Text> <Text>{item.description}</Text><br />
              <Text strong>Amount:</Text> <Text>${item.Amount}</Text><br />
              <Text strong>CTN No:</Text> <Text>{item.ctnNo}</Text><br />
              <Text strong>CBM:</Text> <Text>{item.cbm}</Text><br />
              <Text strong>Tracking No:</Text> <Text>{item.trackingNo}</Text>
            </Card>
          ))}

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button type="primary" onClick={onClose}>Close</Button>
          </div>
        </>
      )}
    </Modal>
  )
}

export default UserShipmentData