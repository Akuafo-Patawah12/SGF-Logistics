import React, { useState } from "react";
import { Modal, Input, Button, Form ,message} from "antd";

const CBMInputModal = ({ isVisible, onClose, onSubmit ,selectedOrder ,setShipments,socket}) => {
  const [form] = Form.useForm(); // Ant Design form instance
  const [cbm,setCbm] = useState()
  const [ctn,setCtn] = useState()
 
  const handleSubmit = () => {
    
        socket.emit("addCBM",{cbm,ctn,selectedOrder },(response)=>{
          if(response.status==="ok"){
            form.resetFields(); // Reset form after submission
            onClose();
            message.success("Cbm updated")
            setShipments((prev) => 
              prev.map((shipment) => {
                const updatedShipment = response.data.find((newItem) => newItem._id === shipment._id);
                return updatedShipment ? { ...shipment, ...updatedShipment } : shipment;
              })
            );
            console.log(response.data)
        }else{
            message.error(response.message)
        }
        })
        
  };

  return (
    <Modal
      title="Enter CTN & CBM Amount"
      open={isVisible}
      onCancel={onClose}
      footer={null} // Remove default footer buttons
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="CBM Amount"
          name="cbm"
          rules={[
            { required: true, message: "Please enter CBM amount!" },
            { pattern: /^\d+(\.\d+)?$/, message: "Enter a valid number!" },
          ]}
        >
          <Input type="number" placeholder="Enter CBM Amount" value={cbm} onChange={(e)=> setCbm(e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="CTN"
          name="ctn"
          rules={[
            { required: true, message: "Please enter CBM amount!" },
            { pattern: /^\d+(\.\d+)?$/, message: "Enter a valid number!" },
          ]}
        >
          <Input type="number" placeholder="Enter CTN " value={ctn} onChange={(e)=> setCtn(e.target.value)}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CBMInputModal;
