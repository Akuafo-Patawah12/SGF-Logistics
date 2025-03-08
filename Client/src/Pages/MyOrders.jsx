import React,{useState, useMemo, useEffect, useRef} from "react"
import {Link} from "react-router-dom"
import { message,Empty, Spin ,Card, Typography, Space,Button,Segmented ,Input}  from "antd"
import io from "socket.io-client"
import Invoice from "../Components/Invoice"
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { formatDistanceToNow, subDays } from "date-fns";
import UserShipmentData from "../Components/UserShipmentData"
import LogisticFooter from "../Components/LogisticFooter"

import { EyeOutlined ,DownloadOutlined , SearchOutlined} from "@ant-design/icons";


import "../Styles/MyOrders.css"
import SessionExpiredModal from "../Components/SessionEpiredModal";
const AllOrders=()=>{
  const [myorders,setMyOrders]  = useState([])
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noresult,setNoresult] = useState(false)
  const [search,setSearch] = useState("")
  const [filteredOrders, setFilteredOrders] = useState(myorders);
  const [invoiceData,setInvoiceData] = useState({
    eta: null,
    loadingDate: null,
    containerNumber: null,
    cbmRate: null,
    cbm: null,
    ctn: null,
    amount: null,
    trackingNo:null
  })
    const { Text } = Typography;
    const socket = useMemo(() =>io("https://api.sfghanalogistics.com/orders",{
        transports: ["websocket","polling"],
        withCredentials: true,
        secure: true
      }),[])
   
   const [ viewData,setViewData] = useState(null)

   useEffect(()=>{
      socket.emit("getOrdersByUser","hello",(response)=>{

          if (response.status==="error"){
            setNoresult(true)
            setMyOrders([])
            setLoadingProgress(false)
          }
      })
   },[])

   useEffect(() => {
    localStorage.setItem("lastVisitedTab", "/MyOrders");
  }, []);
  

  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => {
    setActiveId(id);
  };

      useEffect(() => {
        socket.on("connect",()=>{
            console.log("connected to server")
        })
        
        socket.on("sent_to_client", data =>{
           message.success("New shipment")
           setNoresult(false)
           setMyOrders(prev => [data,...prev])
           
          
        })

        socket.on("orderRemovedFromContainer", ( orderId ) => {
          console.log(orderId)
          message.success("1 Order removed from container")
          setMyOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
          if(myorders.length === 0){
            setNoresult(true)
           }
        });

        socket.on("updatedShipment",(data)=>{
            message.success("You order has been assigned to a container")
            let updatedOrder = null; // Store a single updated order
          
          setMyOrders((prev) =>
            prev.map((order) => {
              const foundOrder = data.find((newItem) => newItem._id === order._id);
              if (foundOrder) {
                updatedOrder = foundOrder; // Store the first updated order found
              }
              return foundOrder ? { ...order, ...foundOrder } : order;
            })
          );
        
          if (updatedOrder) {
            handleClick(updatedOrder._id); // Ensure updatedOrder is valid
            message.success("Order updated");
          }
        
        })

        socket.on("containerDeleted", ({ container_number }) => {
          console.log("Container Deleted:", container_number);
        
          setMyOrders(prevContainers =>
            prevContainers.filter(container => container.containerNumber !== container_number)
          );
        });

        
        
        socket.on("orders_updated", (data) => {
          console.log(data);
        
          let updatedOrder = null; // Store a single updated order
        
          setMyOrders((prev) =>
            prev.map((order) => {
              const foundOrder = data.find((newItem) => newItem._id === order._id);
              if (foundOrder) {
                updatedOrder = foundOrder; // Store the first updated order found
              }
              return foundOrder ? { ...order, ...foundOrder } : order;
            })
          );
        
          if (updatedOrder) {
            handleClick(updatedOrder._id); // Ensure updatedOrder is valid
            message.success("Order updated");
          }
        });


        
        
        socket.on('ordersByUser', (data)=>{
          console.log(data)
          setMyOrders(data)
          setLoadingProgress(false)
          
        })

        socket.on("disconnect",(reason)=>{
            console.log(reason)
        })

        socket.on("connect_error",(error)=>{
          console.log(error)
          if(error.message.includes("Refresh token expired")){
            setTimeout(()=>{
              setIsModalOpen(true)
            },1000)
          }
        })

        return()=>{
            socket.off("connect")
            socket.off('ordersByUser')
            socket.off("containerDeleted")
            socket.off("assign_to_container")
            socket.off("orderRemovedFromContainer")
            socket.off("orders_updated")
            socket.off("connect_error")
            socket.off("disconnect")
        }
    }, [socket]);


    useEffect(() => {
      if (!search) {
        setFilteredOrders(myorders); // Reset if search is empty
      } else {
        setFilteredOrders(
          myorders.filter((myOrder) =>
            myOrder.items[0].trackingNo.toString().toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }, [search, myorders]); 
    
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return "Now";
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        if (diffInHours < 24) return `${diffInHours} h ago`;
        if (diffInDays === 1) return "Yesterday";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} wk ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} mo ago`;
        return `${Math.floor(diffInDays / 365)}+ yr ago`;
      };

    function cancelOrder(orderId){
        socket.emit("cancelOrder",orderId,(response)=>{
            if(response.status==="ok"){
                message.success("Order cancelled")
            }else if(response.message==="Cannot delete order"){
                message.error("Delivered or in transit orders cannot be deleted")
            }
        })
    }


    const sortAscending = () => {
      setMyOrders((prevOrders) => 
        [...prevOrders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    };
  
    // Function to sort in Descending order (Newest first)
    const sortDescending = () => {
      setMyOrders((prevOrders) => 
        [...prevOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    };
    
    const [activeTab,setActiveTab] = useState("new")
    return(
        
        <main className="order_container">
        <section
         className={`filter_gap `}
       style={{
        
        
        width: "95%",
        border: "1px solid #ddd",
        
        background: "#f5f5f5",
        borderRadius: "8px",
       
      }}
    >
      {/* Sort By Section */}
      <Space wrap className="buttons_1"> {/* Ensures buttons wrap on small screens */}
        <Typography.Text strong>Sort by:</Typography.Text>
        <Segmented
      options={[
        { label: 'New', value: 'new' },
        { label: 'Old', value: 'old' }
      ]}
      value={activeTab}
      onChange={(value) => {
        setActiveTab(value);
        value === 'new' ? sortDescending() : sortAscending();
      }}
      style={{
        background: '#ccc', // Light background
        padding: '7px',
        borderRadius: '8px',
      }}
    />
     
     
      
      </Space>

      <Input
        placeholder="Search by tracking number..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onPaste={(e) => setSearch(e.clipboardData.getData("text"))} // Ensure paste triggers search
        className="search_input1"
      />
    </section>

    {!noresult ?<>
    {!loadingProgress ? 
      <div className="my_item_grid">
        {filteredOrders && filteredOrders.map((order,index)=>(
           <Card
      key={index}
      bordered={false}
      id={order._id}
      className={activeId ===order._id  ? "active_3" : ""}
      style={{
        
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "13px",
        background: "#fff",
        borderBottom:"3px solid var(--bg)",
      }}
    >
      {/* Three-dot icon */}
      <div  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{fontWeight:"500"}}>Invoice to:  </Text>
        <Text>{order.fullname}</Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{fontWeight:"500"}}>Status:  </Text>
        <Text>{order.status}</Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{fontWeight:"500"}}>CBM:  </Text>
        <Text>{order.items[0].cbm}</Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{fontWeight:"500"}}>CTN:  </Text>
        <Text>{order.items[0].ctn}</Text>
      </div>

      {/* Order ID */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <Text style={{fontWeight:"500"}}>TrackingNo.:</Text>
        <Text>{order.items[0].trackingNo}</Text>
      </div>

      {/* Time Ago */}
      <Text style={{ fontStyle: "italic", color: "#888", display: "block", marginTop: "8px" }}>
        {formatDate(order.createdAt)}
      </Text>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap:"6px",justifyContent: "flex-end", marginTop: "16px" , padding:"0"}}>

        <Button type="text"  icon={<EyeOutlined />} style={{ marginLeft: "8px",background:"#ddd" ,fontSize:"11px !important",fontWeight:"400"}} 
           onClick={()=>{
            setViewData ({
                          fullname: order.fullname,
                          email: order.email,
                          status: order.status,
                          createdAt: order.createdAt,
                          updatedAt: order.updatedAt,
                          selected_country: order.selected_country,
                          route: order.route,
                          items: [
                            {
                              description: order.items[0].description,
                              Amount: order.items[0].amount,
                              ctn: order.items[0].ctn,
                              cbm: order.items[0].cbm,
                              trackingNo: order.items[0].trackingNo,
                            },
                          ],
                        })
                        handleOpen();
           }
           }

        >View</Button>
       <Button
  onClick={() => {
    setLoadingIndex(index)
    const data = {
      shippingMark: order.fullname,
      eta: order.eta,
      loadingDate: order.loadingDate,
      containerNumber: order.containerNumber,
      cbmRate: order.cbmRate,
      cbm: order.items[0]?.cbm,
      ctn: order.items[0]?.ctn,
      amount: order.items[0]?.amount,
      trackingNo: order.items[0]?.trackingNo
    };
    
    
    setInvoiceData(data);

    // Ensure `handleDownload` runs AFTER `invoiceData` is updated
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
    }, 100); // Small delay to allow state update
  }}
  icon={loadingIndex===index ? <Spin size="small" style={{transform:"translateY(-3px)"}}/> : <DownloadOutlined style={{ transform: "translateX(2px)" }} />}
  style={{ backgroundColor: "#ffcccc" }}
/>


      </div>
    </Card>  
        ))}
        </div> 
        : <Spin size="medium" style={{marginTop:"50px"}}/>}
        </> : 
        <Empty 
        description="No Shipment" 
        style={{ paddingBlock: "70px" }}
        styles={{ image: { transform:"translateX(18px)", display: "block" } }}
       
         />}
        
        <UserShipmentData
       visible={visible2}
        onClose={handleClose}
        shipmentData={viewData}
        loading3={loading3}
   
    />

    <Invoice  invoiceData={invoiceData} divRef={divRef}/>

<SessionExpiredModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> <SessionExpiredModal />
           <LogisticFooter />


        </main>

    )
}

export default AllOrders