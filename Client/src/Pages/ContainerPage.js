import React, { useEffect, useState ,useMemo} from "react";
import { io } from "socket.io-client";
import { List, Card ,Button,Select,Modal,DatePicker,Form,message, Input,Typography,Table, Tag, Spin, Alert} from "antd";
import SessionExpiredModal from "../Components/Auth/SessionEpiredModal";
import { EyeOutlined } from "@ant-design/icons";
import AssignUsersModal from "./Components/AssignUsersModal"






const ContainerList = () => {
    const { Option } = Select;
const { Text } = Typography;

const socket = useMemo(() =>io("https://sfghanalogistics.com/shipment",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    socket.emit("get_all_container")
  },[])

  const routes = {
      A: ["China", "Sri Lanka", "Yemen", "Egypt", "Algeria", "Sierra Leone", "Ghana"], 
      B: ["China", "Saudi Arabia", "Egypt", "Lybia", "Morocco", "Guinea", "Ghana"],
      C: ["China", "Sri Lanka", "Tunisia", "Mauritania", "Guinea Bissau", "Cote D’Ivoire", "Ghana"],
      D: ["China", "Yemen", "Egypt", "Morocco", "Senegal", "Liberia", "Ghana"],
      E: ["China", "Saudi Arabia", "Egypt", "Algeria", "Spain", "Gambia", "Ghana"],
    };
  
    const statusOptions = ["All","Pending...", "In Transit", "Delivered", "Cancelled"]; 
    const [filterStatus, setFilterStatus] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [permission,setPermission] = useState(false)
     const [selectedRoute, setSelectedRoute] = useState(null);
     const [selectedCountry, setSelectedCountry] = useState(null);
    const [shipmentStatus, setShipmentStatus] = useState(null);
    const[cbmRate,setCbmRate] = useState(null)
    const[containerNumber,setContainerNumber] = useState()
    const [containerName,setContainerName] = useState("")
    const [eta,setEta] = useState()
    const[isEdit,setIsEdit]= useState(false)
    const [loadingDate,setLoadingDate] = useState()
    const [assignedOrder_id,setAssignedOrder_id]= useState([])
    

    useEffect(() => {
        // Fetch initial container list
        socket.emit("fetchContainers", (response) => {
          if (response.status === "ok") {
            setContainers(response.containers);
          } else {
            setError(response.message);
          }
          setLoading(false);
        });
    },[])

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

  const handleRouteChange = (route) => {
    setSelectedRoute(route);
    setSelectedCountry(null); // Reset country selection when route changes
  };

  const handleSave = () => {
    if ( !selectedCountry || !shipmentStatus) {
      console.error("Please select a country, and a status before updating.");
      return;
    }

    // Emit the data to the server
    
    socket.emit("createContainer", {
      containerName: containerName,
      containerNumber:containerNumber,
      eta:eta,
      cbmRate: parseFloat(cbmRate),
      route: selectedRoute,
      port: selectedCountry,
      status: shipmentStatus,
    },(response)=>{
      if (response.status === "ok") {
          message.success("Shipment updated successfully");
      } else {
          message.error(response.message);
      }})
    

    setIsEdit(false);
  };


  const columns = [
    { title: "Container Name", dataIndex: "containerName", key: "containerName" },
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
      title: "ETA",
      dataIndex: "eta",
      key: "eta",
      render: (eta) => new Date(eta).toLocaleDateString(),
    },
    {
      title: "Assigned Orders",
      dataIndex: "assignedOrders",
      key: "assignedOrders",
      render: (orders) =>
        orders.length > 0 ? (
          <>
          <Tag>{orders.length}</Tag> 
          <button onClick={() =>{ 
            setModalOpen(true)
            setAssignedOrder_id(orders.map((order)=> order.orderId))
            }}
            >
            View
            </button>
          </>
        ) : (
          <Tag color="gray">No Orders</Tag>
        ),
    },
  ];


  return (

    <div>
    <Button type="primary" onClick={() => setIsEdit(true)}>Add container</Button>
    

<Modal title="Add container" visible={isEdit} onCancel={() => setIsEdit(false)} footer={null}>
      <Form layout="vertical">
        
        {/* Select Route */}
        <div style={{ marginBottom: "15px" }}>
        <Form.Item
          label="Container Name"
          name="containerName"
          value={containerName}
          onChange={(e)=> setContainerName(e.target.value)}
          rules={[{ required: true, message: "Please enter container name!" }]}
        >
          <Input placeholder="Enter Container Name" />
        </Form.Item>

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
    

    <AssignUsersModal isOpen={modalOpen}  assignedOrder_id={assignedOrder_id} onClose={() => setModalOpen(false)}/>
    
    <Table columns={columns} dataSource={containers} rowKey="_id" />
    <SessionExpiredModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
};

export default ContainerList;
