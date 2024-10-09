import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'


const OrderTable = (props) => {
  return (
    <div>
         <table className="w-[95%] mt-3 ml-auto">
        <thead>
            <tr>
              <th><input type='checkbox'></input></th>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Arrival time</th>
            </tr>
        </thead>
        <tbody>
          {props.orders.map((order,index)=>(
            <tr key={order._id} id={`row-${order._id}`}>
              <td><input type="checkbox"></input></td>
              <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize:"14px",lineHeight:"20px"}}>{order._id}</td>
              <td></td>
              <td></td>
              <td onClick={() => props.deleteOrder(order._id,order.customer_id)}><DeleteOutlined/></td>
              <td >{order.Status}</td>
            </tr>
          ))}
            
        </tbody>
    </table>
    </div>
  )
}

export default OrderTable