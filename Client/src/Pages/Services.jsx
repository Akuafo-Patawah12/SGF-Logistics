import React from 'react'
import "./Components/Services.css"
import ServicesComponent from './Components/ServicesComponent'
import { RocketOutlined } from '@ant-design/icons'

const Services = () => {
  return (
    <div className='service_container'>
        <div className='service_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.6)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                Services
           </section>

           
        </div>
        <p className="title">Fast & Affordable <span style={{color:"red",fontSize:"40px"}}>Services</span> For You.</p>
        <ServicesComponent />

        <section>
            <p className="get_start">Get Star<span style={{fontSize:"40px"}}><RocketOutlined /></span>ed</p>
            <p></p>
        </section>
    </div>
  )
}

export default Services