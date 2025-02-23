// Frontend - React with CSS
import React, { useState,useMemo, useEffect,useRef } from 'react';
import io from 'socket.io-client';
import { EyeOutlined, EditOutlined, DeleteOutlined , FilePdfOutlined } from '@ant-design/icons';
import {Form,Tooltip, Table, Tag, Button, Spin, message,Card,Typography,Input, Checkbox, Modal, Result, Select} from "antd";
import './AdminDashboard.css'
import SessionExpiredModal from "../Components/Auth/SessionEpiredModal"
import { useNavigate } from "react-router-dom"
import UserShipmentData from "./UserShipmentData"
import { Link } from "react-router-dom"
import CBMInputModal from "./Components/CBMInputModal"
import axios from "axios"
import New from "./New"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const { Title } = Typography;


const AdminDashboard = () => {

  const socket = useMemo(() =>io("https://sfghanalogistics.com/shipment",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])


  const [form] = Form.useForm();
  const navigate= useNavigate()
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [permission,setPermission] = useState(false)
  const [shipments, setShipments] = useState([]);
  
    const [loading, setLoading] = useState(true);
    const[isModalData,setModalData] = useState([])
    const[isEdit,setIsEdit]= useState(false)
    const[isModalVisible,setIsModalVisible]= useState(false)
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });

  
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [selectedShipmentsPdf, setSelectedShipmentsPdf ] = useState([]); // New state to store selected shipments
  const [showInvoice,setShowInvoice] = useState(false)
  const [containerNumber, setContainerNumber] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ invoice,setInvoice] = useState(
    {
      description:"",
      email:"",
      trackingNo:"",
      ctn:"",
      cbm:"",
      total:""
    }
  )
  const [shipmentData, setShipmentData] = useState(null);
 
     
  
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

    socket.on("connect_error", (err)=>{
      console.log(err)
      if (err.message.includes("404: Refresh token not found")) {
        setTimeout(()=>{
        setIsModalOpen(true)
      },1000)
    
     }else if(err.message.includes("403: Unauthorized")) {
        setTimeout(()=>{
        setPermission(true)
      },1000)
        
     } else if (err.message.includes("401: Invalid refresh token")) {
        setTimeout(()=>{
          setIsModalOpen(true)
        },1000)
      }
    else if(err.message.includes("No cookies found")) {
      setTimeout(()=>{
      setIsModalOpen(true)
    },1000)
      
   }
    });
    

    socket.on("disconnect",(reason)=>{
       console.log(reason)
    })


    return()=>{
       socket.off("connect")
       socket.off("all_orders")
       socket.off("disconnect")
       socket.off("newOrder")
       socket.off("connect_error")
       socket.off("delete-shipment")
    }
  }, [socket,shipments]);

  

 


  

  
  

  const handleDeleteShipment = async (id) => {
    await fetch(`https://sfghanalogistics.com/delete-shipment/${id}`, {
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
  
  

  useEffect(() => {
    // Update selectedShipments when selectedShipmentIds change
    setSelectedShipmentsPdf(shipments.filter((shipment) => selectedShipments.includes(shipment.id)));
  }, [selectedShipments, shipments]);   // Runs when either `selectedShipmentIds` or `shipments` change

  const handleSave = () => {
    

    // Emit the data to the server
    socket.emit("update_Shipments", {
      containerNumber,
      selectedShipments
    },(response)=>{
      if (response.status === "ok") {
                  message.success("Shipment updated successfully");
                } else {
                  message.error(response.error.message);
                }})
    

    setIsEdit(false);
  };


  function updateCBM(data) {
    console.log("Before Update:", shipments);
    setShipments((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.orderId === data.selectedOrder
          ? {
              ...order,
              items: order.items.map((item, index) =>
                index === 0
                  ? { ...item, cbm: item.cbm === data.newCBM  }
                  : item
              ),
            }
          : order
      );
      console.log("After Update:", updatedOrders);
      return updatedOrders;
    });
  }
  
  useEffect(() => {
    console.log("Shipments Updated:", shipments);
  }, [shipments]);

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


  

const allSelected = selectedShipments.length === shipments.length && shipments.length > 0;
const someSelected = selectedShipments.length > 0 && selectedShipments.length < shipments.length;

const handleSelectAll = (e) => {
  if (e.target.checked) {
    setIsModalVisible(true); // Show modal when all are selected
    setSelectedShipments(shipments.map((shipment) => ({ orderId: shipment._id, userId: shipment.userId }))); // Select all
  } else {
    setIsModalVisible(false);
    setSelectedShipments([]); // Deselect all
  }
};

const handleSelectSingle = (e, shipment) => {
  setSelectedShipments((prev) =>
    e.target.checked
      ? [...prev, { orderId: shipment._id, userId: shipment.userId }] // Add selected shipment
      : prev.filter((s) => s.orderId !== shipment._id) // Remove deselected shipment
  );
};

  
  function viewInvoice(){
    setShowInvoice(true)
   }
  


  const columns = [
    {
      title: (
        <Checkbox
        onChange={handleSelectAll}
        checked={allSelected}
        indeterminate={someSelected}
      />
      ),
      key: "_id",
      render: (shipment) => (
        <Checkbox
        checked={selectedShipments.some((s) => s.orderId === shipment._id)}
        onChange={(e) => handleSelectSingle(e, shipment)}
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
      title: "CBM",
      dataIndex: "items",
      key: "cbm",
      render: (items) => (
        items.map(item => item.cbm)
          
      ),
  },
    {
        title: <Title level={1} style={{fontSize:"19px", marginInline: "auto" }}>Actions</Title>,
        key: "actions",
        render: (_, shipment) => (
            <div style={{ display: "flex", gap: "10px",justifyContent:"center" }}>
                  
                  <EyeOutlined 
                    onClick={()=>{
                     
                     setShipmentData ({
                          fullname: shipment.fullname,
                          email: shipment.email,
                          phone: shipment.phone,
                          status: shipment.status,
                          createdAt: shipment.createdAt,
                          updatedAt: shipment.updatedAt,
                          selected_country: shipment.selected_country,
                          route: shipment.route,
                          items: [
                            {
                              description: shipment.items[0].description,
                              Amount: shipment.items[0].amount,
                              cbm: shipment.items[0].cbm,
                              trackingNo: shipment.items[0].trackingNo,
                            },
                          ],
                        })
                        handleOpen();
                    }}
                  />
                  <Tooltip title="Invoice">
                  <FilePdfOutlined
                   style={{ color: "red", cursor: "pointer" }} 
                   onClick={()=>{
                    
                    setInvoice({
                      description: shipment.items[0].description,
                      email:shipment.email,
                      trackingNo: shipment.items[0].trackingNo,
                      ctn:shipment.items[0].ctnNo,
                      cbm:shipment.items[0].cbm,
                      total:shipment.items[0].Amount,
                    })
                    viewInvoice();
                   }}
                    />
                  </Tooltip>

                  <Tooltip title="Edit">
                  <EditOutlined
                    style={{ color: "#1890ff", cursor: "pointer" }}
                    onClick={() => cbmModalOpen(shipment._id)}
                  />
                  </Tooltip>
                  <DeleteOutlined
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteShipment(shipment._id)}
                  />

                  
                </div>
        ),
    },
];



  const divRef = useRef(); // Store refs dynamically

 

  const generateAndSendPDFs = async (email) => {
  console.log(email)
  setVisible(true); // Show popup
  setLoading1(true); // Show loader
    try {
      
      const formData = new FormData();

      
        const divElement = divRef.current;

       if (!divElement) return;

        // Capture the div as an image
        const canvas = await html2canvas(divElement); // Reduce scale to 1 (default is 2)
        const imgData = canvas.toDataURL("image/jpeg", 0.7); // Use JPEG instead of PNG, lower quality to 70%


        // Create PDF
        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4",
          compress: true, // Enable compression
        });
        
        const imgWidth = 190;  // Max width for A4 (210mm - margins)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Keep aspect ratio

        pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);


        // Convert PDF to Blob & append to FormData
        const pdfBlob = pdf.output("blob");
        formData.append("pdf", pdfBlob, "invoice.pdf");
      

      formData.append("email", email); // Send as JSON string

      const response=await axios.post("http://localhost:4040/send-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        message.success("Invoice sent successfully!");
      } else {
        message.error("Failed to send invoice.");
      }
    } catch (error) {
      message.error("Error sending invoice.");
    } finally {
      setLoading1(false);
      setTimeout(() => setVisible(false), 1000); // Close modal after a short delay
    }
  };

   
  const [visible2, setVisible2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  

  

  const handleOpen = () => {
    setLoading3(true);
    setVisible2(true);

    // Simulating data fetching delay
    setTimeout(() => {
      
      setLoading3(false);
    }, 1000);
  };

  const handleClose = () => {
    setVisible2(false);
    
  };


   const [isCBMVisible, setIsCBMVisible] = useState(false);
   const [selectedOrder,setselectedOrder] = useState("")
  
    const cbmModalOpen = (orderId) =>{ 
      setselectedOrder(orderId)
      setIsCBMVisible(true);
    }
    const cbmModalClose = () => setIsCBMVisible(false);
    const handleSubmit = (cbm) => {
      console.log("Submitted CBM:", cbm); // Handle submission
    };


  return (
    <>
    {!permission ? <div className="admin-page">
      <header className="Admin-head">
      {/* Logo */}
      <div className="logo">🌍 Logistics</div>

      {/* User Info */}
      <div className="user-info">
        <span className="user-name">Andrew</span>
        <div className="user-initials">{getInitials("Andrew")}</div>
      </div>
    </header>

      <h1 style={{marginTop:"20px"}}>Admin Dashboard</h1>

      <Modal open={visible} footer={null} closable={false} centered width={300}>
        <div style={{marginInline:"auto",justifyContent:"center", textAlign: "center",gap:"10px" ,display:"flex",alignItems:"center"}}>
           
          <p style={{fontSize:"16px",fontWeight:"600"}}>Sending Invoice...</p><Spin size="small" />
        </div>
      </Modal>

      <div className="shipment-container-buttons">
      <section style={{marginBottom:"auto",display:"flex",gap:"10px",justifyContent:"center",alignItems:"flex-end"}}>
      

    <Link to={"/users"}>
    <button className="direction-button" onMouseEnter={(e)=> handleClick(e,1)} onClick={(e)=> handleClick(e,1)}>
      View users
      {ripple1 && <span className="ripple" style={{ top: coords.y, left: coords.x }} />}
    </button>
    </Link>

    <Link to={"/containers"}>
    <button className="direction-button" onMouseEnter={(e)=> handleClick(e,0)} onClick={(e)=> handleClick(e,0)}>
      View containers
      {ripple && <span className="ripple" style={{ top: coords.y, left: coords.x }} />}
    </button>
    </Link>
    </section>

    <CBMInputModal
        isVisible={isCBMVisible}
        onClose={cbmModalClose}
        selectedOrder={selectedOrder}
        updateCBM={updateCBM}
        onSubmit={handleSubmit}
      />

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


      

      

     

     

      
     
      <div style={{ paddingBlock: 20 ,display:"flex",justifyContent:"center",alignItems:"center"}}>
            
            {loading ? (
                <Spin size="large" />
            ) : (
                <div style={{width:"95%",overflow:"auto",}} className="table_scroll"><Table dataSource={filteredShipments} columns={columns} rowKey="_id" style={{width:"100%"}}/></div>
            )}
        </div>
    
        <Modal
        title="Manage Assigned Container"
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
        <p>{selectedShipments.length} Orders selected</p>
        <p>Do you want to Edit or Remove them?</p>
      </Modal>


       <Modal title="Assign orders to container" visible={isEdit} onCancel={() => setIsEdit(false)} footer={null}>
       <Form form={form} onFinish={handleSave} layout="vertical">
       <Form.Item
        name="containerNumber"
        rules={[{ required: true, message: "Please enter a container number" }]}
      >
        <Input placeholder="Enter Container Number" value={containerNumber} onChange={(e)=> setContainerNumber(e.target.value)} />
      </Form.Item>
      

         

      <Button type="primary" style={{ marginTop: "10px",height:"40px", width: "100%" }} 
      htmlType="submit"
      disabled={ false}>
        Save Changes
      </Button>
      </Form>
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

     

     
    {showInvoice && <New invoice={invoice} divRef={divRef} setShowInvoice={setShowInvoice} generateAndSendPDFs={generateAndSendPDFs}/>}
    
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    
   <UserShipmentData
       visible={visible2}
        onClose={handleClose}
        shipmentData={shipmentData}
        loading3={loading3}
   
    />
      
    </div>
    <SessionExpiredModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div> :

    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Result
        status="403"
        title="403"
        subTitle="You are not permitted to view this page."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Go Home
          </Button>
        }
      />
    </div>}
    </>
  );
};


export default AdminDashboard;
