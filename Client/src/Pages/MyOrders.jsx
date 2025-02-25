import React,{useState, useMemo, useEffect} from "react"
import {Link} from "react-router-dom"
import { message,Empty, Spin ,Card, Typography, Space,Button}  from "antd"
import io from "socket.io-client"
import { formatDistanceToNow, subDays } from "date-fns";
import UserShipmentData from "./UserShipmentData"
import LogisticFooter from "../Components/LogisticFooter"

import { EyeOutlined ,DeleteOutlined } from "@ant-design/icons";


import "./MyOrders.css"
import SessionExpiredModal from "../Components/Auth/SessionEpiredModal";
const AllOrders=()=>{
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noresult,setNoresult] = useState(false)
    const { Text } = Typography;
    const socket = useMemo(() =>io("https://api.sfghanalogistics.com/orders",{
        transports: ["websocket","polling"],
        withCredentials: true,
        secure: true
      }),[])
   const [myorders,setMyOrders]  = useState([])
   const [ viewData,setViewData] = useState(null)

   useEffect(()=>{
      socket.emit("getOrdersByUser","hello",(response)=>{
          if (response.status==="error"){
            message.error("Error fetching orders")
          }
      })
   },[])

   useEffect(() => {
    localStorage.setItem("lastVisitedTab", "/MyOrders");
  }, []);
  

      useEffect(() => {
        socket.on("connect",()=>{
            console.log("connected to server")
        })

        socket.on("assign_to_container",(data)=>{
            message.success("You order has been assigned to a container")
        })
        
        socket.on('ordersByUser', (data)=>{
          setMyOrders(data)
          setLoadingProgress(false)
          if(data.length===0){
            setNoresult(true)
          }
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
            socket.off("assign_to_container")
            socket.off("connect_error")
            socket.off("disconnect")
        }
    }, [socket]);

    


    

    
    
      
   

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
    
    return(
        
        <main className="order_container">
        <section
         className="filter_gap"
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
        <Button type="primary" onClick={sortDescending}>New</Button>
        <Button onClick={sortAscending}>Old</Button>
      </Space>

      {/* Create Order Button */}
      <Link to="/More/get_a_qoute" className="create_order_button">
        <Button type="primary" className="create_order-btn">
          Create Order
        </Button>
      </Link>
    </section>

    {!noresult ?<>
    {!loadingProgress ? 
      <div className="my_item_grid">
        {myorders && myorders.map((order,index)=>(
           <Card
      key={index}
      bordered={false}
      style={{
        
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "13px",
        background: "#fff",
        borderBottom:"3px solid var(--bg)",
      }}
    >
      {/* Three-dot icon */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text strong>Invoice to:  </Text>
        <Text>{order.fullname}</Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text strong>Status:  </Text>
        <Text>{order.status}</Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text strong>CBM:  </Text>
        <Text>{order.items[0].cbm}</Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text strong>CTN:  </Text>
        <Text>{order.items[0].ctnNo}</Text>
      </div>

      {/* Order ID */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <Text strong>#TrackingNo.:</Text>
        <Text>{order.items[0].trackingNo}</Text>
      </div>

      {/* Time Ago */}
      <Text style={{ fontStyle: "italic", color: "#888", display: "block", marginTop: "8px" }}>
        {formatDate(order.createdAt)}
      </Text>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>

        <Button type="text"  icon={<EyeOutlined />} style={{ marginLeft: "8px",background:"#ddd" }} 
           onClick={()=>{
            setViewData ({
                          fullname: order.fullname,
                          email: order.email,
                          phone: order.phone,
                          status: order.status,
                          createdAt: order.createdAt,
                          updatedAt: order.updatedAt,
                          selected_country: order.selected_country,
                          route: order.route,
                          items: [
                            {
                              description: order.items[0].description,
                              Amount: order.items[0].Amount,
                              ctnNo: order.items[0].ctnNo,
                              cbm: order.items[0].cbm,
                              trackingNo: order.items[0].trackingNo,
                            },
                          ],
                        })
                        handleOpen();
           }
           }

        >View</Button>
        <Button onClick={()=> cancelOrder(order._id)} type="text" icon={<DeleteOutlined style={{transform:"translateX(2px)"}}/>} style={{backgroundColor:" #ffcccc"}} />
      </div>
    </Card>  
        ))}
        </div> 
        : <Spin size="medium"/>}
        </> : <Empty style={{paddingBlock:"70px"}}/>}
        
        <UserShipmentData
       visible={visible2}
        onClose={handleClose}
        shipmentData={viewData}
        loading3={loading3}
   
    />

<SessionExpiredModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> <SessionExpiredModal />
           <LogisticFooter />


        </main>

    )
}

export default AllOrders