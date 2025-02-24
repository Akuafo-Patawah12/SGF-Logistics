import React, { useState } from "react";
import { Modal, Input, Button, Form ,message} from "antd";
import axios from "axios"

const CBMInputModal = ({ isVisible, onClose, onSubmit ,selectedOrder ,updateCBM}) => {
  const [form] = Form.useForm(); // Ant Design form instance
  const [cbm,setCbm] = useState()
  const handleSubmit = async() => {
    try{
        const response= await axios.post("http://localhost:4040/addCbm",{cbm,selectedOrder })
        if(response.status===200){
            form.resetFields(); // Reset form after submission
            onClose();
            message.success("Cbm updated")
            updateCBM(response.data.newData)
            console.log(response.data.newData)
        }else{
            message.error(response.data.message)
        }
    
     // Close modal
    }catch(error){
        console.log(error)
    }
  };

  return (
    <Modal
      title="Enter CBM Amount"
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
