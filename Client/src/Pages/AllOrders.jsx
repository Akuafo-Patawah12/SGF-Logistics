import React from "react"
import {Link} from "react-router-dom"

import LogisticFooter from "../Components/LogisticFooter"
import { DownloadOutlined,EllipsisOutlined, EyeOutlined } from "@ant-design/icons"
import "./AllOrders.css"
const AllOrders=()=>{
    return(

        <main className="order_container">
        <section className="nav_button">

            <div><span>Sort by</span><button style={{marginLeft:"5px"}}>New</button> <button>Old</button></div>
            <div><Link to={"/Orders"}><button>Create Order</button></Link></div>
        </section>
        
        <div className="order_box">
        <span className="three_dot"><EllipsisOutlined /></span>
         <p>Status:  Pending...</p>
         <p>#Order_ID: 1i2u9191ihs</p>
         <p style={{fontStyle:"italic"}}>3days ago</p>
         <div><button><DownloadOutlined /></button><button style={{marginLeft:"5px"}}> <EyeOutlined/></button></div>
        </div>

        <div className="order_box">
        <span className="three_dot"><EllipsisOutlined /></span>
         <p>Status:  In-transit</p>
         <p>#Order_ID: whwuw83883772</p>
         <p style={{fontStyle:"italic"}}>5min ago</p>
         <div><button><DownloadOutlined /></button><button style={{marginLeft:"5px"}}> <EyeOutlined/></button></div>

        </div>

           <LogisticFooter />
        </main>

    )
}

export default AllOrders