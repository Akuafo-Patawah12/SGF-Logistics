import React from 'react'
import {Link} from "react-router-dom"
import { DollarCircleOutlined,CheckCircleOutlined,BulbOutlined,InteractionOutlined, ContainerOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css"

const SeaFreight = () => {
  const style={position:"absolute",left:"-8%",color:" #A7C756",transform:"translateY(2px)"}
  return (
    <div className="cont">
      <div className='Freight_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
           <p style={{fontSize:"40px",fontWeight:"700",textAlign:"center",width:"",marginInline:"auto"}}>Sea Freight Services</p>
           </section>

           
        </div>
        <div className="parallelogram">
          <section ><Link to={"/"}>Home</Link></section>
          <section ><Link to={"/Services"}>Services</Link></section>
          <section style={{color:"#A7C756"}}>Sea Freight</section>
        </div>
        <section className="freight">
        <div>
      <h3 className="fright_head">Sea Freight</h3>
      <p>
        SF Ghana Logistics provides reliable and cost-effective Sea Freight Services for clients with large shipments. Whether you’re shipping goods from Ghana to China or vice versa, our sea freight solutions are ideal for transporting bulk goods over long distances.
      </p>
      </div>


      <div>
      <h3><span style={style}><CheckCircleOutlined /></span>Key Benefits:</h3>
      <ul>
        <li><DollarCircleOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Cost-Effective:</strong> <p>Sea freight is the most economical option for large and heavy shipments.</p>
        </li>
        <li><ContainerOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Large Capacity:</strong> <p>Ideal for businesses with bulk shipments, ensuring that even the largest orders are handled efficiently.</p>
        </li>
      </ul>
      </div>
      <div>
      <h3><span style={style}><InteractionOutlined /></span> How it Works</h3>
      <p>
        Our sea freight service covers the entire shipping process from port to port, depending on your needs. We handle all logistics, including container booking, loading, and customs clearance, ensuring that your goods are shipped efficiently and arrive on time.
      </p>
      </div>

      <div>
      <h3><span style={style}> <BulbOutlined /></span>Ideal For:</h3>
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

export default SeaFreight