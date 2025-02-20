import React from 'react'
import {Link} from "react-router-dom"
import { DollarCircleOutlined, ContainerOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css"

const Groupage = () => {
  return (
    <div className="cont">
      <div className='Freight_image_header relative-3'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
           <p style={{fontSize:"40px",fontWeight:"700",textAlign:"center",maxWidth:"80%",marginInline:"auto"}}>Groupage Services.</p>
           </section>

           
        </div>
        <div className="parallelogram">
          <section ><Link to={"/"}>Home</Link></section>
          <section ><Link to={"/Services"}>Services</Link></section>
          <section style={{color:"#A7C756"}}>Groupage</section>
        </div>
        <section className="freight">
    <div>
      <h3 className="fright_head">Groupage</h3>
        <p>
            Our Groupage Services allow businesses with small to medium-sized shipments to save on costs 
            by sharing container space with others. This service is perfect for clients who do not require an 
            entire container but still need reliable and timely delivery.
        </p>
        </div>

        <div>
      <h3>Key Benefits:</h3>
      <ul>
        <li><strong>Cost-Effective:</strong><p> Reduce costs by sharing container space, making shipping more 
        affordable for smaller businesses.</p></li>
        <li><strong>Flexible Scheduling:</strong><p> We offer regular shipments between Ghana and China to ensure 
        convenience for all clients.</p></li>
        <li><strong>Professional Handling:</strong><p> Despite shared container space, your goods receive the same 
        level of care and attention as larger shipments.</p></li>
      </ul>
      </div>

      <div>
      <h3>How it Works:</h3>
      <p>
      Groupage allows multiple clients to consolidate their goods into one container. SFGL takes care 
      of the logistics, ensuring that each client’s cargo is delivered safely and promptly.
      </p>
      </div>
       
       <div>
      <h3>Ideal For:</h3>
      <ul>
        <li><ShopOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Small and medium businesses</strong>
        </li>
        <li><SmileOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Importers and exporters looking to minimize shipping costs.</strong>
        </li>
      </ul>
      </div>
    </section>
    </div>
  )
}

export default Groupage