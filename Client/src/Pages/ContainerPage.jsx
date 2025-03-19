import React, { useEffect, useState ,useMemo,useRef} from "react";
import { io } from "socket.io-client";
import { Result ,Button,Select,Modal,DatePicker,Form,message, Input,Typography,Table, Tag, Spin, Alert} from "antd";
import SessionExpiredModal from "../Components/SessionEpiredModal";
import { DeleteOutlined , EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"
import Invoice from "../Components/Invoice"
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ButtonLoader from '../Icons/ButtonLoader'
import AssignUsersModal from "../Components/AssignUsersModal"
import "../Styles/ContainerPage.css"





const ContainerList = () => {
    const { Option } = Select;
const { Text } = Typography;
const navigate= useNavigate()

const socket = useMemo(() =>io("https://api.sfghanalogistics.com/shipment",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

  const socket1 = useMemo(() =>io("https://api.sfghanalogistics.com/orders",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState(containers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [invoiceData,setInvoiceData] = useState({
      shippingMark: null,
      eta: null,
      loadingDate: null,
      containerNumber: null,
      cbmRate: null,
      cbm: null,
      ctn: null,
      amount: null,
      trackingNo:null
    })
  useEffect(() => {
    if (!search) {
      setFilteredContainers(containers); // Reset if search is empty
    } else {
      setFilteredContainers(
        containers.filter((container) =>
          container.containerNumber.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, containers]); 

  useEffect(() => {
    const handleConnect = () => {

      socket1.emit("joinRoom", "adminRoom");
      socket.emit("get_all_container");
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
      socket1.on("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket1.off("connect", handleConnect);
      socket.disconnect();
      socket1.disconnect();
    };
  }, []);

  

  const routes = {
      Guangzhou_Route_1: ["Guangzhou Port", "Colombo Port", "Port of Aden", "Port of Alexandria", "Port of Algiers", "Port of Freetown", "Tema Port"], 
      Yiwu_Route_1: ["Ningbo – Zhoushan Port, Yiwu", "Jeddah Islamic Port", "Port Said (Suez Canal)", "Port of Tripoli", "Port of Tangier Med", "Port of Conakry", "Tema Port"],
      Guangzhou_Route_2: ["Guangzhou Port", "Colombo Port", "Port of Tunis", "Port of Nouakchott", "Port of Bissau", "Port of Abidjan", "Tema Port"],
      Guangzhou_Route_3: ["Guangzhou Port", "Port of Aden", "Port of Alexandria", "Port of Tangier Med", "Port of Dakar", "Port of Monrovia", "Tema Port"],
      Yiwu_Route_2: ["Ningbo – Zhoushan Port, Yiwu", "Colombo Port", "Suez Port (Port Tawfiq)", "Port of Algiers", "Port of Las Palmas", "Port of Banjul", "Tema Port"],
    };
  
    const statusOptions = ["All", "In Transit", "At Tema Port waiting for clearance", "At our warehouse"]; 
    const [filterStatus, setFilterStatus] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [permission,setPermission] = useState(false)
     const [selectedRoute, setSelectedRoute] = useState(null);
     const [selectedCountry, setSelectedCountry] = useState(null);
    const [shipmentStatus, setShipmentStatus] = useState(null);
    const[cbmRate,setCbmRate] = useState(null)
    const[containerNumber,setContainerNumber] = useState()
    
    const [eta,setEta] = useState()
    const[isEdit,setIsEdit]= useState(false)
    const [loadingDate,setLoadingDate] = useState()
    const [creatingOrder,setCreatingOrder]= useState(false);
    const [assignedOrder_id,setAssignedOrder_id]= useState([])
    const [containerid,setContainerId] = useState(null)
    const [orderInfo,setOrderInfo] = useState(
      {
        fullname:"",
        email:"",
        container_id:""
      }
    )

    const [items, setItems] = useState([
      { description:"Unclassified", trackingNo: "",cbm:"",ctn:""}
  ]);

  const handleInputChange = (index, field, event) => {
    const { value } = event.target;
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  
    
  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);

      socket.emit("fetchContainers", (response) => {
        if (response.status === "ok") {
          setContainers(response.containers);
        } else {
          setError(response.message);
        }
        setLoading(false);
      });
    };

    if (socket.connected) {
      handleConnect(); // Emit immediately if already connected
    } else {
      socket.on("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []); // No dependencies needed

    useEffect(() => {
        // Fetch initial container list
        
    },[])

    useEffect(() => {
      localStorage.setItem("lastVisitedTab", "/containers");
    }, []);

  useEffect(() => {
    socket.on("connect",()=>{
        console.log("connected to container page")
    })

    socket.on("get_container",(data)=>{
        
    })

    socket.on("containersUpdated", (updatedContainers) => {
        setContainers(updatedContainers);
      });

    socket.on("containerCreated",(data)=>{
        setContainers(prev => [data,...prev])
    })

    socket.on("containerUpdated", (updatedContainer) => {
      setContainers((prev) => [...prev, updatedContainer]);
    });

    

    socket.on("receive",(data)=>{
      setCreatingOrder(false)
      
      message.success("New order")
      console.log("order data",data)
    })

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
        else if(err.message.includes("No cookies found")){
          setTimeout(()=>{
          setIsModalOpen(true)
        },1000)
          
       }
        });

    socket.on("disconnect", (reason) => {
        console.log(reason);
      });

    return () => {
      socket.off("connect")
      socket.off("containerUpdated");
      socket.off("containersUpdated");
      socket.off("containerCreated")
      socket.off("get_container")
      socket.off("connect_error")
      socket.off("disconnect")
    };
  }, [socket]);

  useEffect(() => {
    socket1.on("connect",()=>{
        console.log("connected to container page")
    })
    socket1.on("receive",(data)=>{
      setCreatingOrder(false)
      
      message.success("New order")
      console.log("order data",data)
    })

    socket1.on("newContainerAdded",(data)=>{
      message.success("new container added")
      setContainers(prev => [data,...prev])
    })

    socket1.on("orderRemovedFromContainer", ({ orderId } ) => {
      message.success("1 shipment removed from container"); 
      setContainers(prevContainers =>
        prevContainers.map(container => ({
          ...container,
          assignedOrders: container.assignedOrders.filter(order => order.orderId !== orderId)
        }))
      );
    });

    socket1.on("updatedShipment", (data)=>{
      message.success("Shipment updated")
      setContainers(prev =>
        prev.map(item =>{
            const updated = data.find(list =>  list._id === item._id)

             return updated ? {...item,...updated} : item;
        })
      )
    })

    socket1.on("new",(data)=>{
      message.success("New shipment added")
      setContainers((prev) => 
        prev.map((container) => {
          const updatedShipment = data.find((newItem) => newItem._id === container._id);
          return updatedShipment ? { ...container, ...updatedShipment } : container;
        })
      );
      console.log(data)
    })

    socket1.on("delete_container",(containerId)=>{
      setContainers((prev) => {
        
         const fliteredContainer= prev.filter((container) => container._id !== containerId);
          return fliteredContainer 
        
     });
     
    })

    socket1.on("disconnect",(reason)=>{
         console.log(reason)
    })


    return()=>{
      socket1.off("connect")
      socket1.off("receive")
      socket1.off("new")
      socket1.off("diconnect")
    }

  },[socket1])

  const divRef = useRef(null)
  
      const handleDownload = () => {
        const input = divRef.current;
    
        html2canvas(input, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 size in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height accordingly
    
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("download.pdf");
        });
      };
  

  const handleRouteChange = (route) => {
    setSelectedRoute(route);
    setSelectedCountry(null); // Reset country selection when route changes
  };

  const handleSave = () => {
    if ( !selectedCountry || !shipmentStatus || !containerNumber || !cbmRate || !eta || !loadingDate) {
      message("All fields are required");
      return;
    }

    // Emit the data to the server
    
    socket.emit("createContainer", {
      
      containerNumber:containerNumber,
      loadingDate: loadingDate,
      eta:eta,
      cbmRate: parseFloat(cbmRate),
      route: selectedRoute,
      port: selectedCountry,
      status: shipmentStatus,
    },(response)=>{
      if (response.status === "error") {
        message.error(response.message);
      } 
         
      })
    

    setIsEdit(false);
  };

  const [isModalVisible3, setIsModalVisible3] = useState(false);

  const handleOpen3 = () => setIsModalVisible3(true);
  const handleClose3 = () => setIsModalVisible3(false);
  

  const validateForm = () => {
    // Check if any orderInfo field is empty
    for (const key in orderInfo) {
      if (!orderInfo[key].trim()) {
        message.warning(`Please fill in the ${key.replace("_", " ")}`);
        return false;
      }
    }
  
    // Validate each item in the items array
    for (let i = 0; i < items.length; i++) {
      const { trackingNo, cbm, ctn } = items[i];
  
      if (!trackingNo.trim()) {
        message.warning(`Tracking number is required for item ${i + 1}`);
        return false;
      }
  
      if (!cbm.trim() || isNaN(cbm) || Number(cbm) <= 0) {
        message.warning(`Valid CBM is required for item ${i + 1}`);
        return false;
      }
  
      if (!ctn.trim() || isNaN(ctn) || Number(ctn) <= 0) {
        message.warning(`Valid CTN is required for item ${i + 1}`);
        return false;
      }
    }
  
    return true;
  };
  
   
    const handleSubmit1 = () => {
      if (!validateForm()) return;
     
      setCreatingOrder(true)
      setTimeout(()=>{
        socket1.emit("createOrder",{items,...orderInfo},(response) => {
          if (response.status === "ok") {
            setCreatingOrder(false)
            handleClose3()
            

          } else {
            setCreatingOrder(false)
            message.error(response.message);
          }})
      },1000)
      
    };

    function editOrderStatus(){
        socket1.emit("editOrderStatus",{containerId,selectedRoute,selectedCountry,shipmentStatus},(response)=>{
          if (response.status === "ok") {
            message.success(response.message);
            setIsEditContainer(false)
            const data= response.data;
            setContainers(prev =>
              prev.map(item =>{
                  const updated = data.find(list =>  list._id === item._id)

                   return updated ? {...item,...updated} : item;
              })
            )
          } else {
            message.error(response.message);
          }})
    }

  
     const [containerId,setContainerIds] = useState(null)
     const [isEditContainer,setIsEditContainer] = useState(false)

     const handleEditContainer = () => {
      setIsEditContainer(true);
     }

     function deleteContainer(containerId){
        socket1.emit("deleteContainer",containerId,(response)=>{
            if(response.status==="ok"){
              message.success("Container deleted")
            }else{
               message.error(response.message)
            }
        })
     }

  const columns = [
    
    { title: "Container Number", dataIndex: "containerNumber", key: "containerNumber" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Pending..." ? "orange" : status === "In Transit" ? "blue" : status === "Delivered" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Route", dataIndex: "route", key: "route" },
    { title: "Port", dataIndex: "port", key: "port" },
    {
      title: "CBM Rate",
      dataIndex: "cbmRate",
      key: "cbmRate",
      render: (cbmRate) => `$${cbmRate.toFixed(2)}`,
    },
    {
      title: "Loading Date",
      dataIndex: "loadingDate",
      key: "loadingDate",
      render: (loadingDate) => new Date(loadingDate).toLocaleDateString()
      },
    {
      title: "ETA",
      dataIndex: "eta",
      key: "eta",
      render: (eta) => new Date(eta).toLocaleDateString(),
    },
    {
      title: "Assigned Orders",
     
      key: "assignedOrders",
      render: (_,orders) =>
         <div >
        {orders.assignedOrders.length > 0 ? (
          
          <>
          <Tag style={{float:"left"}}>{orders.assignedOrders.length}</Tag> 
          <Tag
          
           style={{cursor:"pointer",float:"left"}}
           onClick={() =>{ 
             setContainerId(orders._id)
             
             
             setInvoiceData((prev) => ({...prev ,containerNumber: orders.containerNumber,cbmRate: orders.cbmRate,loadingDate: orders.loadingDate,eta: orders.eta}))
            
            setTimeout(()=>{
              setModalOpen(true)
              setAssignedOrder_id(orders.assignedOrders.map((order)=> order.orderId))
            },50)
            
            
            }}
            >
            View
            </Tag>
          </>
        ) : (
          <Tag color="gray">No Orders</Tag>
        )}
       
        </div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_,container) =>
        <div style={{ display: "flex", gap: "3px" }}>
  <Button 
    size="small" 
    type="primary" 
    onClick={() => {
      handleOpen3();
      setOrderInfo({ ...orderInfo, container_id: container._id });
    }}
  >
    Add Order
  </Button>

  <Button 
    size="small" 
    type="default" 
    style={{fontSize:"12px"}}
    onClick={() => {
      handleEditContainer();
      setContainerIds(container._id);
    }}
  >
    <EditOutlined />
  </Button>

  <Button 
    size="small" 
    type="danger" 
    onClick={()=> deleteContainer(container._id)}
  >
    <DeleteOutlined style={{ color:"red"}}/>
  </Button>
</div>
,
    },
  ];


  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsRateModalOpen(true);
  };

  const handleCancel = () => {
    setIsRateModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    const numberValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, Number(value)])
    );
    socket1.emit("update_rates",numberValues,(response)=>{
      if (response.status==="ok")
      {
        message.success(response.message)

      }else{
        message.error("Failed")
      }
  })
    setIsRateModalOpen(false);
    form.resetFields();
  };


  return (
  <>
    {!permission ? <div>
    <div className="container_head"><Button type="primary" onClick={() => setIsEdit(true)} className="conta-butt">Add container</Button>
    <Button type="primary" onClick={showModal}>
        Update Rates
      </Button>
    <Input
        placeholder="Search by Container Number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onPaste={(e) => setSearch(e.clipboardData.getData("text"))} // Ensure paste triggers search
        className="search_input"
      />
      </div>
<Modal title="Add container" open={isEdit} onCancel={() => setIsEdit(false)} footer={null}>
      <Form layout="vertical">
        
        {/* Select Route */}
        <div style={{ marginBottom: "15px" }}>
        

        {/* Container Number Input */}
        <Form.Item
          label="Container Number"
          name="containerNumber"
          value={containerNumber}
          onChange={(e)=> setContainerNumber(e.target.value)}
          rules={[{ required: true, message: "Please enter container number!" }]}
        >
          <Input placeholder="Enter Container Number" type="number" />
        </Form.Item>

        <Form.Item label="Loading Date" name="loadingDate" rules={[{ required: true, message: "Please select a loading date!" }]}>
        <DatePicker 
          style={{ width: "100%" }} 
          value={loadingDate} 
          onChange={(date) => setLoadingDate(date)}
          format="YYYY-MM-DD"
        />
      </Form.Item>

      {/* ETA Input */}
      <Form.Item label="ETA (Estimated Time of Arrival)" name="eta" rules={[{ required: true, message: "Please select ETA!" }]}>
        <DatePicker 
          style={{ width: "100%" }} 
          value={eta} 
          onChange={(date) => setEta(date)}
          format="YYYY-MM-DD"
        />
      </Form.Item>

      <Form.Item label="CBM Rate" name="cbmRate" rules={[{ required: true, message: "Please enter CBM rate!" }]}>
        <Input type="number" step="0.01" value={cbmRate} onChange={(e)=> setCbmRate(e.target.value)} placeholder="Enter CBM Rate" />
      </Form.Item>

        <div style={{ marginBottom: "16px" }}>
      <Text strong>Select Route:</Text>
      <Select
        style={{ width: "100%", height: "40px", marginTop: "5px" }}
        placeholder="Select Route"
        value={selectedRoute}
        onChange={handleRouteChange}
      >
        {Object.keys(routes).map((route) => (
          <Option key={route} value={route}>
            Route {route}
          </Option>
        ))}
      </Select>
    </div>
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
      <Text strong>Update Status:</Text>
      <Select
        style={{ width: "100%", marginTop: "5px" }}
        onChange={(status) => setShipmentStatus(status)}
        placeholder="Select Status"
        value={shipmentStatus}
      >
        {statusOptions.map((status) => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </Select>
    </div>
      </Form>

      

      <Button type="primary" style={{ marginTop: "10px",height:"40px", width: "100%" }} 
      onClick={ handleSave  }
      disabled={!selectedRoute || !selectedCountry || !shipmentStatus}>
        Save Changes
      </Button>
    </Modal>
    

  {/* Edit Container Modal */}
  <Modal title="Edit container" open={isEditContainer} onCancel={() => setIsEditContainer(false)} footer={null}>
     <Form>
      <div style={{ marginBottom: "16px" }}>
      <Text strong>Select Route:</Text>
      <Select
        style={{ width: "100%", height: "40px", marginTop: "5px" }}
        placeholder="Select Route"
        value={selectedRoute}
        onChange={handleRouteChange}
      >
        {Object.keys(routes).map((route) => (
          <Option key={route} value={route}>
             {route}
          </Option>
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
      <Text strong>Update Status:</Text>
      <Select
        style={{ width: "100%", marginTop: "5px" }}
        onChange={(status) => setShipmentStatus(status)}
        placeholder="Select Status"
        value={shipmentStatus}
      >
        {statusOptions.map((status) => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </Select>
    </div>

     <Button type="primary" style={{ marginTop: "10px",height:"40px", width: "100%" }}
      disabled={!selectedRoute || !selectedCountry || !shipmentStatus}
      onClick={editOrderStatus}>Save change</Button>
      </Form>

      

      
    </Modal>

    <Modal
  title="Submit Shipment"
  open={isModalVisible3}
  onCancel={handleClose3}
  footer={[
    <Button key="cancel" onClick={handleClose3}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={handleSubmit1}>
      Submit
    </Button>,
  ]}
>
  <Form layout="vertical">
    {/* Shipping Mark Input */}
    <Form.Item
      label="Shipping Mark"
      name="shippingMark"
      rules={[{ required: true, message: "Please enter shipping mark!" }]}
    >
      <Input
        placeholder="Enter shipping mark"
        value={orderInfo.fullname || ""}
        onChange={(e) =>
          setOrderInfo({ ...orderInfo, fullname: e.target.value })
        }
      />
    </Form.Item>

    {/* Email Input */}
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: "Please enter email!" },
        { type: "email", message: "Enter a valid email!" },
      ]}
    >
      <Input
        placeholder="Enter email"
        value={orderInfo.email || ""}
        onChange={(e) =>
          setOrderInfo({ ...orderInfo, email: e.target.value })
        }
      />
    </Form.Item>

    {/* Dynamic Items Inputs */}
    {items.map((item, index) => (
      <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
        {/* CBM Input */}
        <Form.Item
          label="CBM"
          name={[index, "cbm"]} // Unique field for each item
          rules={[{ required: true, message: "Please enter CBM!" }]}
        >
          <Input
            placeholder="Enter CBM"
            value={item.cbm || ""}
            onChange={(e) => handleInputChange(index, "cbm", e)}
          />
        </Form.Item>

        {/* CTN Input */}
        <Form.Item
          label="CTN"
          name={[index, "ctn"]} // Unique field for each item
          rules={[{ required: true, message: "Please enter CTN!" }]}
        >
          <Input
            placeholder="Enter CTN"
            value={item.ctn || ""}
            onChange={(e) => handleInputChange(index, "ctn", e)}
          />
        </Form.Item>

        {/* Tracking Number Input */}
        <Form.Item
          label="Tracking Number"
          name={[index, "trackingNo"]} // Unique field for each item
          rules={[{ required: true, message: "Please enter tracking number!" }]}
        >
          <Input
            placeholder="Enter tracking number"
            value={item.trackingNo || ""}
            onChange={(e) => handleInputChange(index, "trackingNo", e)}
          />
        </Form.Item>
      </div>
    ))}
  </Form>
</Modal>


<Modal
        title="Enter Details"
        open={isRateModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          

          <Form.Item
            label="Sea Freight rate"
            name="Sea_freight"
            min={0} 
            step={0.01}
            
            rules={[
              { required: true, message: "Please enter Sea Freight rate" }
              
            ]}
          >
            <Input type="number" placeholder="Enter Sea freight rate" style={{width:"100%"}}/>
          </Form.Item>
          
          <Form.Item
            label="Air Freight rate"
            name="Air_freight"
            min={0} 
            step={0.01}
            
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input type="number" placeholder="Enter Air freight rate" style={{width:"100%"}}/>
          </Form.Item>

          <Form.Item
            label="RMB Rate"
            name="RMB_rate"
            min="0"
            step={0.01}
            
            rules={[{ required: true, message: "Please enter a RMB rate" }]}
          >
             <Input type="number" placeholder="Enter RMB rate" style={{width:"100%"}}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{background:"var(--purple)"}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>



    {creatingOrder && <div className='creating_order'>Creating Order... <ButtonLoader /></div> }
    <Invoice  invoiceData={invoiceData} divRef={divRef}/>
    <AssignUsersModal isOpen={modalOpen} containerId={containerid} handleDownload={handleDownload} setInvoiceData={setInvoiceData} socket={socket} socket1={socket1} assignedOrder_id={assignedOrder_id} onClose={() => setModalOpen(false)}/>
    
    
    <div style={{width:"95%",overflow:"auto",marginInline:"auto"}} className="table_scroll"><Table columns={columns} dataSource={filteredContainers} pagination={{ pageSize: 5 }} bordered rowKey="_id" /></div>
    <SessionExpiredModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
    :
     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Result
            status="403"
            title="403"
            subTitle="You are not permitted to view this page."
            extra={
              <Button type="primary" onClick={() => {
                navigate("/")
                localStorage.removeItem("hasLoggedInBefore"); // Reset first login flag
                localStorage.removeItem("lastVisitedTab"); // Clear last visited tab
                }}>
                Go Home
              </Button>
            }
          />
        </div>}
    </>
  );
};

export default ContainerList;
