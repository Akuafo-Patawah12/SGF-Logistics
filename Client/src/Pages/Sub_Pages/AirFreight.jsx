import React from 'react'
import { DollarCircleOutlined, ContainerOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css"
const AirFreight = () => {
  return (
    <div className="cont">
      <div className='Freight_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.6)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                Air Freight Services
           </section>

           
        </div>
        
        <section className="freight">
      <div>
      <h2>Air Freight</h2>
      <p>
            Our Air Freight Services are tailored for clients who need fast, reliable, and secure transportation 
            of their goods. Ideal for high-priority or time-sensitive shipments, we ensure your cargo reaches 
            its destination quickly and safely. 
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

export default AirFreight