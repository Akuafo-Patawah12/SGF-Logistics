import React from 'react'
import { DollarCircleOutlined,ThunderboltOutlined, ContainerOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css"

const SeaFreight = () => {
  return (
    <div className="cont">
      <div className='Freight_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.6)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                Sea Freight Services
           </section>

           
        </div>
        <section className="freight">
        <div>
      <h2>Sea Freight</h2>
      <p>
        Ghana Logistics provides reliable and cost-effective Sea Freight Services for clients with large shipments. Whether you’re shipping goods from Ghana to USA or vice versa, our sea freight solutions are ideal for transporting bulk goods over long distances.
      </p>
      </div>


      <div>
      <h3>Key Benefits:</h3>
      <ul>
        <li><DollarCircleOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Cost-Effective:</strong> Sea freight is the most economical option for large and heavy shipments.
        </li>
        <li><ContainerOutlined style={{ color: '#004d80', marginRight: '8px' }} />
          <strong>Large Capacity:</strong> Ideal for businesses with bulk shipments, ensuring that even the largest orders are handled efficiently.
        </li>
      </ul>
      </div>
      <div>
      <h3><ThunderboltOutlined /> How it Works:</h3>
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

export default SeaFreight