import React from 'react'
import {Link} from "react-router-dom"
import { DollarCircleOutlined, ContainerOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css"

const Procurement = () => {
  return (
    <div className="cont">
      <div className='Freight_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
               <p style={{fontSize:"40px",fontWeight:"700",textAlign:"center",maxWidth:"90%",marginInline:"auto"}}>Free Procurement & Sourcing Training .</p>
           </section>

           
        </div>
        
        <div className="parallelogram">
          <section ><Link to={"/"}>Home</Link></section>
          <section ><Link to={"/Services"}>Services</Link></section>
          <section style={{color:"#A7C756"}}>Procurement</section>
        </div>
        <section className="freight">
    <div>
      <h3 className="fright_head">Free Procurement</h3>
        <p>
            Our Free Procurement and Sourcing Training empowers businesses with essential skills for 
            managing logistics, procurement, and international sourcing. This service is designed to help 
            businesses improve their operations without additional cost.
        </p>
        </div>

        <div>
      <h3>Key Benefits:</h3>
      <ul>
        <li><strong>Free of Charge:</strong> No cost to participate in our valuable training programs.</li>
        <li><strong>Led by Experts:</strong> Our training sessions are led by professionals with years of experience 
        in procurement and international trade.</li>
        <li><strong>Practical Knowledge:</strong> Learn actionable strategies to optimize your procurement 
        processes and sourcing decisions.</li>
      </ul>
      </div>

      <div>
      <h3>How it Works:</h3>
      <p>
      Learn actionable strategies to optimize your procurement 
      processes and sourcing decisions.
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

export default Procurement