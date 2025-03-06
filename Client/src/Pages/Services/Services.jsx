import React,{useState} from 'react'
import "../../Styles/Services.css"
import ServicesComponent from '../../Components/ServicesComponent'

import Map, { Marker,  NavigationControl } from "react-map-gl";
import Rocket from '../../Icons/Rocket'
import Callicon from '../../Icons/Callicon'
import MailIcon from '../../Icons/MailIcon'
import {EnvironmentOutlined} from "@ant-design/icons"
import { transform } from 'framer-motion'

const Services = () => {
  const [viewport,setViewport] = useState({
    latitude: 5.6112,
    longitude: -0.2181,
    zoom: 13,
  });
  return (
    <div className='service_container'>
        <div className='service_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",height:"100%",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                Services
           </section>

           
        </div>
        <p className="title">Fast & Affordable <span style={{color:"var(--purple)",fontSize:"40px"}}>Services</span> For You.</p>
        <ServicesComponent />
      
       
        <section className="Contact_info" style={{marginInline:"auto"}}>
        <div className='Infor'>
            
        <p className="get_start">Get Star<Rocket /><span className="ed">ed</span></p>
            <p style={{fontSize:"18px",color:"#333",marginTop:"20px",fontSize:"16px",textAlign:"justify"}}>
            Looking to optimize your logistics and shipping operations? At SFG logistics, we're excited to collaborate with you to ensure your goods are transported smoothly and efficiently worldwide.
            </p>
            <div className='contacts'>
            <div className="service_icon"><Callicon className="i"/></div>
               <p>020 811 6360 / 053 948 0433</p>
               <p>Feel free to call us.</p>
            </div>
            <div className="contacts">
            <div className="service_icon"><MailIcon className="i"/></div>
                <p>sfghanalogistics24@gmail.com</p>
                <p>Feel free to mail us.</p>
            </div>
            </div>

  <div className="map">
            <Map
      initialViewState={viewport}
      style={{ width: "100%", height:"400px",marginTop:"30px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      id="Map"
      
      scrollZoom={{
        smooth: true, // Enable smooth zooming
        speed: 1.2,   // Adjust zoom speed
        touch: false,  // Allow touch gestures for zoom
      }}
      dragRotate={false} // Prevent accidental rotation
      
    >
      <Marker latitude={5.6112} longitude={-0.2181}>
        <div><EnvironmentOutlined />
        <p style={{fontSize:"14px"}}>Sf Ghana Logistics</p>
        </div>
      </Marker>

     

<NavigationControl position="top-right" />
      {/* Add Popup or other components here */}
    </Map> 
    </div>
          
        </section>
    </div>
  )
}

export default Services