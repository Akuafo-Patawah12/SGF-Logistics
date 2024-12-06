import React,{useState} from 'react'
import "./Components/Contact.css"
import Map, { Marker,  NavigationControl } from "react-map-gl";
import ContactIcon from '../Icons/ContactIcon'
import {EnvironmentOutlined} from "@ant-design/icons"



const ContactUs = () => {

    const [viewport,setViewport] = useState({
        latitude: 5.6112,
        longitude: -0.2181,
        zoom: 13,
      });
  return (
    <main style={{marginTop:"90px"}}>
        <section className='header_image'>
           <div className='contact_header'>Contact Us</div>
        </section>
        <div style={{marginInline:"auto",marginTop:"30px",width:"fit-content",padding:"5px 0 0 5px",border:"2px solid  #A7C756",borderRadius:"5px",marginBottom:"10px"}}><ContactIcon/> </div>
        <section>
            <div>
                <h3 style={{marginInline:"auto",width:"fit-content",marginbottom:"15px"}}>Send us a message</h3>
                <p style={{marginInline:"auto",fontSize:"17px",width:"90%",color:"#444",textAlign:"justify",fontWeight:"400"}}>
                   Have questions or need assistance? Send us a message, and our dedicated team at 
                   SFG Logistics will get back to you promptly. We’re here to provide you with the support 
                   and information you need to make your logistics experience seamless and efficient.
                </p>


    
        
        <Map
      initialViewState={viewport}
      style={{ width: "100%", height:"400px",marginTop:"30px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoiYWt1YWZvLTEiLCJhIjoiY200MXhxNnJrMDQzNjJrcjAzbXg4cTliMCJ9.6cwG6dff4E2UjnQz7q963A"
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

                <div className="contact">
                    <form className='contact_form'>
                        <input type="text" placeholder='Your name' name="name" id="name" />
                        <input type="email" placeholder='Your email' name="email" id="email" />
                        <input type="text" placeholder='Subject' name="subject" id="subject" />
                        <textarea rows={3} placeholder='Your message' name="message" id="message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>

            </div>
            
        </section>
    </main>
  )
}

export default ContactUs