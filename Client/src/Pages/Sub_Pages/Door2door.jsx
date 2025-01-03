import React from 'react'
import {Link} from "react-router-dom"
import { DollarCircleOutlined, ContainerOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css"

const Door2door = () => {
  return (
    <div className="cont" >
      <div className='Freight_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
           <p style={{fontSize:"40px",fontWeight:"700",textAlign:"center",width:"",marginInline:"auto"}}>Door To Door Delivery.</p>
           </section>

           
        </div>
        <div className="parallelogram">
          <section ><Link to={"/"}>Home</Link></section>
          <section ><Link to={"/Services"}>Services</Link></section>
          <section style={{color:"#A7C756"}}>Door to door</section>
        </div>
        <section className="freight">
    <div>
      <h3 className="fright_head">Door to door delivery</h3>
        <p>
            Our Door-to-Door Delivery Service offers a hassle-free solution, managing the entire logistics 
            process from pickup to final delivery. 
        </p>
        </div>

        <div>
      <h3>Key Benefits:</h3>
      <ul>
        <li><strong>Hassle-Free: </strong><p> We handle every aspect of the delivery, from our warehouse to your 
        doorstep.</p> </li>
        <li><strong>Secure Handling:</strong> <p>Your goods are managed with the utmost care at every stage of the 
        journey.</p></li>
      </ul>
      </div>

      <div>
      <h3>How it Works:</h3>
      <p>
         Once your shipment is ready, we take care of everything—customs clearance, transportation, and 
        delivery directly to the recipient’s location, making the process easy and efficient.
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

export default Door2door