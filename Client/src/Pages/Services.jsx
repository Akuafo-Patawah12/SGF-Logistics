import React from 'react'
import "./Components/Services.css"
import ServicesComponent from './Components/ServicesComponent'
import { RocketOutlined } from '@ant-design/icons'
import Rocket from '../Icons/Rocket'
import Callicon from '../Icons/Callicon'
import MailIcon from '../Icons/MailIcon'

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

        <section style={{width:"95%",marginInline:"auto"}}>
            <p className="get_start">Get Star<Rocket /><span className="ed">ed</span></p>

            <p style={{fontSize:"18px",color:"#333",marginTop:"20px",whiteSpace: "no-wrap"}}>
            Looking to optimize your logistics and shipping operations? At SFG logistics, we're excited to collaborate with you to ensure your goods are transported smoothly and efficiently worldwide.
            </p>
            <div className='contacts'>
               <Callicon /> 
               <p>020 811 6360 / 053 948 0433</p>
            </div>
            <div className="contacts">
               <MailIcon />
                <p>sfghanalogistics24@gmail.com</p>
            </div>

            
        </section>
    </div>
  )
}

export default Services