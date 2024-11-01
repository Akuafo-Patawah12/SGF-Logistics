import React from 'react'
import {Link} from "react-router-dom"
import { DollarCircleOutlined, ContainerOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
const Groupage = () => {
  return (
    <div className="cont">
      <div className='Freight_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.6)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                Door To Door Delivery
           </section>

           
        </div>
        <div className="parallelogram">
          <section ><Link to={"/"}>Home</Link></section>
          <section ><Link to={"/Services"}>Services</Link></section>
          <section style={{color:"#A7C756"}}>Groupage</section>
        </div>
        <section className="freight">
    <div>
      <h3>Groupage</h3>
        <p>
            Our Groupage Services allow businesses with small to medium-sized shipments to save on costs 
            by sharing container space with others. This service is perfect for clients who do not require an 
            entire container but still need reliable and timely delivery.
        </p>
        </div>

        <div>
      <h3>Key Benefits:</h3>
      <ul>
        <li><strong>Cost-Effective:</strong> Sea freight is the most economical option for large and heavy shipments.</li>
        <li><strong>Large Capacity:</strong> Ideal for businesses with bulk shipments, ensuring that even the largest orders are handled efficiently.</li>
      </ul>
      </div>

      <div>
      <h3>How it Works:</h3>
      <p>
        Our sea freight service covers the entire shipping process from port to port, depending on your needs. We handle all logistics, including container booking, loading, and customs clearance, ensuring that your goods are shipped efficiently and arrive on time.
      </p>
      </div>
       
       <div>
      <h3>Ideal For:</h3>
      <ul>
        <li><ShopOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Businesses needing full logistics support</strong>
        </li>
        <li><SmileOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Clients looking for a stress-free shipping experience</strong>
        </li>
      </ul>
      </div>
    </section>
    </div>
  )
}

export default Groupage