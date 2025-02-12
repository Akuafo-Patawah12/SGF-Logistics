// Frontend - React with CSS
import React, { useState,useMemo, useEffect } from 'react';
import io from 'socket.io-client';
import { EyeOutlined, EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import {Form, Table, Tag, Button, Spin, message,Card,Typography,Input, Checkbox, Modal , Select} from "antd";
import './AdminDashboard.css'
import axios from "axios"

const { Title } = Typography;


const AdminDashboard = () => {

  const socket = useMemo(() =>io("http://localhost:4040/shipment",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [addUserPop,setAddUsersPop] = useState(false)
    const [loading, setLoading] = useState(true);
    const[isModalData,setModalData] = useState([])
    const[isEdit,setIsEdit]= useState(false)
    const[isModalVisible,setIsModalVisible]= useState(false)
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [shipment, setShipment] = useState({ route: 'A', tracking: '', status: 'Pending' });
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState(null); 



  const routes = {
    A: ["China", "Sri Lanka", "Yemen", "Egypt", "Algeria", "Sierra Leone", "Ghana"],
    
    B: ["China", "Saudi Arabia", "Egypt", "Lybia", "Morocco", "Guinea", "Ghana"],
    C: ["China", "Sri Lanka", "Tunisia", "Mauritania", "Guinea Bissau", "Cote D’Ivoire", "Ghana"],
    D: ["China", "Yemen", "Egypt", "Morocco", "Senegal", "Liberia", "Ghana"],
    E: ["China", "Saudi Arabia", "Egypt", "Algeria", "Spain", "Gambia", "Ghana"],
  };

  const statusOptions = ["All","Pending...", "In Transit", "Delivered", "Cancelled"]; 
  const [filterStatus, setFilterStatus] = useState("All");


  const [formData, setFormData] = useState({
    trackingNumber: '',
    origin: '',
    destination: '',
    status: 'Pending',
  });

  // Fetch all shipments on component mount
  

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

 
 useEffect(()=>{
  socket.emit('get_orders',"sent");

  socket.emit("joinRoom", "adminRoom")
 },[])

  useEffect(() => {
    socket.on('connect',()=>{
      console.log("Connected to server")
      
  });

    

    socket.on("all_orders",(data)=>{
      console.log(data)
      setShipments(data)
      setLoading(false);
       
    })
    message.error("Failed to fetch shipment")

    socket.on('shipmentData', (data) => {
      setShipments(data);
    });

    socket.on('newOrder', (data) => {
      console.log(data)
      setShipments((prev) => [data,...prev, ]);
    });

    socket.on('update-shipment', (data) => {
      setShipments((prev) => prev.map((s) => (s._id === data._id ? data : s)));
    });

    socket.on('delete-shipment', (id) => {
      setShipments((prev) => prev.filter((s) => s._id !== id));
    });

    socket.on("disconnect",(reason)=>{
       console.log(reason)
    })


    return()=>{
       socket.off("connect")
       socket.off("all_orders")
       socket.off("disconnect")
       socket.off("newOrder")
       socket.off("delete-shipment")
    }
  }, [socket]);

  

 


  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add-admin', newAdmin, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Admin added successfully');
      setNewAdmin({ username: '', password: '' });
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  
  

  const handleDeleteShipment = async (id) => {
    await fetch(`http://localhost:5000/delete-shipment/${id}`, {
      method: 'DELETE'
    });
  };



  
  

  
  




  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState(false);
  const [ripple1, setRipple1] = useState(false);
  


  const handleClick = (e,index) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    if(index===0){
    setRipple(true);
    setTimeout(() => setRipple(false), 600); // Remove ripple effect after 600ms
    }else {
      setRipple1(true);
    setTimeout(() => setRipple1(false), 600);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


  const filteredShipments =
  filterStatus === "All"
    ? shipments
    : shipments.filter((shipment) => shipment.status === filterStatus);

  

  // Handle "Remove" action
  

  const handleEditClick = () => {
    if (selectedShipments.length === 1) {
      // Pre-fill modal with the data of the selected shipment
      const selectedShipment = shipments.find(
        (shipment) => shipment._id === selectedShipments[0]
      );
      setModalData(selectedShipment); // Assuming setModalData sets the state for the modal form
      setIsEdit(true); // Show the modal
    } else if (selectedShipments.length > 1) {
      // Handle editing multiple shipments
      // You might want to display a different form or message for bulk editing
      setIsEdit(true); // Show modal for bulk editing
    }
  };
  
  const handleRouteChange = (route) => {
    setSelectedRoute(route);
    setSelectedCountry(null); // Reset country selection when route changes
  };

  const handleSave = () => {
    if (selectedShipments.length === 0 || !selectedCountry || !shipmentStatus) {
      console.error("Please select shipments, a country, and a status before updating.");
      return;
    }

    // Emit the data to the server
    socket.emit("update_Shipments", {
      shipments: selectedShipments,
      route: selectedRoute,
      selected_country: selectedCountry,
      status: shipmentStatus,
    },(response)=>{
      if (response.status === "ok") {
                  message.success("Shipment updated successfully");
                } else {
                  message.error("Failed to fetch shipments");
                }})
    

    setIsEdit(false);
  };


  const handleDelete = () => {
    if (selectedShipments.length === 0) {
      console.error("No shipments selected for deletion.");
      return;
    }

    socket.emit("deleteShipments", { shipmentIds: selectedShipments },(response)=>{
      if(response.status==="ok"){
          message.success(response.message)
      }
    });

    setSelectedShipments([]); // Clear selection
    setIsModalVisible(false);
  };

  

  


  const columns = [
    {
      title: (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              setIsModalVisible(true); // Show modal when all are selected
              setSelectedShipments(shipments.map((shipment) => shipment._id)); // Select all
            } else {
              setIsModalVisible(false); // Show modal when all are selected
              setSelectedShipments([]); // Deselect all
            }
          }}
          checked={selectedShipments.length === shipments.length && shipments.length > 0} 
          indeterminate={selectedShipments.length > 0 && selectedShipments.length < shipments.length}
        />
      ),
      key: "_id",
      render: (shipment) => (
        <Checkbox
          checked={selectedShipments.includes(shipment._id)}
          onChange={(e) => {
            setSelectedShipments((prev) => 
              e.target.checked
                ? [...prev, shipment._id]  // Select only this shipment
                : prev.filter(id => id !== shipment._id) // Deselect only this shipment
            );
          }}
        />
      ),
    }
    ,
    {
        title: "Tracking Number",
        dataIndex: "items",
        key: "trackingNo",
        render: (items) => items.map(item => item.trackingNo).join(", ") // Show tracking numbers
      },
    {
        title: "Route",
        dataIndex: "route",
        key: "route",
        render: (route) => (
          <p>{route==="" ? "-" : route}</p>
      ),
    },
    
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
            <Tag color={status === "Delivered" ? "green" : "blue"}>{status}</Tag>
        ),
    },
    {
        title: <Title level={1} style={{fontSize:"19px", marginInline: "auto" }}>Actions</Title>,
        key: "actions",
        render: (_, shipment) => (
            <div style={{ display: "flex", gap: "10px",justifyContent:"center" }}>
                  
                  <EyeOutlined
                   style={{ color: "red", cursor: "pointer" }} 
                    />
                  
                  <EditOutlined
                    style={{ color: "#1890ff", cursor: "pointer" }}
                    onClick={() => console.log("Edit Shipment:", shipment._id)}
                  />
                  <DeleteOutlined
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteShipment(shipment._id)}
                  />

                  
                </div>
        ),
    },
];

  return (
    <div className="admin-page">
      <header className="Admin-head">
      {/* Logo */}
      <div className="logo">🌍 Logistics</div>

      {/* User Info */}
      <div className="user-info">
        <span className="user-name">Andrew</span>
        <div className="user-initials">{getInitials("Andrew")}</div>
      </div>
    </header>

      <h1>Admin Dashboard</h1>

      <div className="shipment-container-buttons">
      <section style={{marginBottom:"auto",display:"flex",gap:"10px",justifyContent:"center",alignItems:"flex-end"}}>
      <button className="direction-button" onMouseEnter={(e)=> handleClick(e,0)} onClick={(e)=>{ 
      handleClick(e,0);
      setAddUsersPop(true)
      }}>
      Add users
      {ripple && <span className="ripple" style={{ top: coords.y, left: coords.x }} />}
    </button>
    <button className="direction-button" onMouseEnter={(e)=> handleClick(e,1)} onClick={(e)=> handleClick(e,1)}>
      View users
      {ripple1 && <span className="ripple" style={{ top: coords.y, left: coords.x }} />}
    </button>
    </section>



    <div style={{  display: "flex", gap: "7px" }}>
        {statusOptions.map((status) => (
          <Button
            key={status}
            onClick={() => setFilterStatus(status)}
            type={filterStatus === status ? "primary" : "default"}
            style={{fontSize:"13px"}}
          >
            {status}
          </Button>
        ))}
      </div>
    </div>


      {addUserPop && <section className="add-admin">
       <Card className="admin_sub" style={{ maxWidth: "400px", margin: "auto" }}>
      <Title level={3}>Add Admin</Title>
      <Input
        placeholder="Username"
        value={newAdmin.username}
        onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
        style={{ marginBottom: "10px",height: 30 }}
      />
      <Input.Password
        placeholder="Password"
        value={newAdmin.password}
        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" block onClick={handleAddAdmin}>
        Add Admin
      </Button>
    </Card>
      </section>}

      

     

     

      
     
      <div style={{ padding: 20 ,display:"flex",justifyContent:"center",alignItems:"center"}}>
            
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table dataSource={filteredShipments} columns={columns} rowKey="_id" style={{width:"100%"}}/>
            )}
        </div>
    
        <Modal
        title="Manage Selected Shipments"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="edit" type="primary" onClick={() => {
    setIsModalVisible(false); // Close the modal
    handleEditClick(); // Call the edit function
  }}>
            Edit
          </Button>,
          <Button key="remove" danger onClick={handleDelete}>
            Remove
          </Button>,
        ]}
      >
        <p>{selectedShipments.length} shipments selected</p>
        <p>Do you want to Edit or Remove them?</p>
      </Modal>


       <Modal title="Edit Shipments" visible={isEdit} onCancel={() => setIsEdit(false)} footer={null}>
      <div>
        <h3 style={{ fontWeight: "600", marginBottom: "10px" }}>{selectedShipments.length} Selected Shipments</h3>

        {/* Select Route */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Select Route:</label>
          <Select
            style={{ width: "100%" ,height:"40px"}}
            onChange={handleRouteChange}
            placeholder="Select Route"
            value={selectedRoute}
          >
            {Object.keys(routes).map((route) => (
              <Select.Option key={route} value={route} >
                Route {route}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Select Country (Only if Route is selected) */}
        {selectedRoute && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
              Select Country in Route {selectedRoute}:
            </label>
            <Select
              style={{ width: "100%",height:"40px" }}
              onChange={(country) => setSelectedCountry(country)}
              placeholder="Select Country"
              value={selectedCountry}
            >
              {routes[selectedRoute].map((country) => (
                <Select.Option key={country} value={country}>
                  {country}
                </Select.Option>
              ))}
            </Select>
          </div>
        )}

        {/* Select Shipment Status (Applies to all selected shipments) */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>Update Status:</label>
          <Select
            style={{ width: "100%" }}
            onChange={(status) => setShipmentStatus(status)}
            placeholder="Select Status"
            value={shipmentStatus}
          >
            {statusOptions.map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>

          <Form.Item>
          <Checkbox
            name="rememberMe"
          >
            Send invoice
          </Checkbox>
        </Form.Item>
        </div>
      </div>

      <Button type="primary" style={{ marginTop: "10px",height:"40px", width: "100%" }} onClick={handleSave} disabled={!selectedRoute || !selectedCountry || !shipmentStatus}>
        Save Changes
      </Button>
    </Modal>



    {selectedShipments.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            display: "flex",
            gap: "10px",
            zIndex: 1000,
          }}
        >
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
                setIsModalVisible(false); // Close the modal
                handleEditClick(); // Call the edit function
              }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          <Button
            type="danger"
            icon={<DeleteOutlined />}
            
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      )}



    </div>
  );
};


export default AdminDashboard;
