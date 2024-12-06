import React from "react"
import {Link} from "react-router-dom"
import { DownloadOutlined } from "@ant-design/icons"
import "./AllOrders.css"
const AllOrders=()=>{
    return(

        <main className="order_container">
        <div><Link to={"Orders"}><button>Create Order</button></Link></div>
        <div className="order_box">
         <p>Status:  Pending...</p>
         <p>#Order_ID: 1i2u9191ihs</p>
         <p>3days ago</p>
           <button><DownloadOutlined /></button>
        </div>

        <div className="order_box">
         <p>Status:  In-transit</p>
         <p>#Order_ID: whwuw83883772</p>
         <p>5min ago</p>
         <button><DownloadOutlined /></button>

        </div>


        </main>

    )
}

export default AllOrders