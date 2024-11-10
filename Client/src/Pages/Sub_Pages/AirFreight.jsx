import React from 'react'
import { Link} from "react-router-dom"
import { CheckCircleOutlined,BulbOutlined,InteractionOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css"
const AirFreight = () => {
  const style={position:"absolute",left:"-8%",color:" #A7C756",transform:"translateY(2px)"}
  return (
    <div className="cont">
      <div className='Freight_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                Air Freight Services
           </section>

           
        </div>

        <div className="parallelogram">
          <section ><Link to={"/"}>Home</Link></section>
          <section ><Link to={"/Services"}>Services</Link></section>
          <section style={{color:"#A7C756"}}>Air Freight</section>
        </div>
        
        <section className="freight">
      <div>
      <h3 className="fright_head">Air Freight</h3>
      <p>
            Our Air Freight Services are tailored for clients who need fast, reliable, and secure transportation 
            of their goods. Ideal for high-priority or time-sensitive shipments, we ensure your cargo reaches 
            its destination quickly and safely. 
      </p>
      </div>

      <div>
      <h3><span style={style}><CheckCircleOutlined /></span>Key Benefits:</h3>
      <ul>
        <li><strong>Cost-Effective:</strong> Sea freight is the most economical option for large and heavy shipments.</li>
        <li><strong>Large Capacity:</strong> Ideal for businesses with bulk shipments, ensuring that even the largest orders are handled efficiently.</li>
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

export default AirFreight