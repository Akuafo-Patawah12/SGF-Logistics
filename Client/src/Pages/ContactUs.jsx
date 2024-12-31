import React,{useState} from 'react'
import "./Components/Contact.css"
import "./Orders.css"
import Map, { Marker,  NavigationControl } from "react-map-gl";
import ContactIcon from '../Icons/ContactIcon'
import {EnvironmentOutlined} from "@ant-design/icons"



const ContactUs = () => {

    
  return (
    <form className="order">

    <h3 style={{marginBlock:"20px 10px",fontWeight:"500"}}>Make An Enquiry</h3>

    <p style={{marginBottom:"30px",fontSize:"14px"}}>Fill out the form below to get a tailored for your shipping needs.<br/>
       ur tean will get back to you after 12hours with the details.
    </p>
   <div className='free_quote_input'>
      <input type="text"  placeholder='First name' />
      <input type="text"  placeholder='Last name'/>
      <input type='text'  placeholder='Email' />
      <input type="text"  placeholder='WhatsApp number'/>

   </div>

      <div className="shipment_radio_checks">    
            <div>
              <div style={{fontWeight:"500",fontSize:"16px"}}>Shipment Type</div>
              <section   className="check">
              
              <label> <div className="input_container"><input type='radio' name="shippemt_type"/> </div>Sea Freight</label>
               <label> <div className="input_container"><input type='radio' name="shippemt_type"/> </div>Air Freight </label>
                <label><div className="input_container"><input type='radio' name="shippemt_type"/> </div>Door-to-door delivery</label>

                <label><div className="input_container"><input type='radio' name="shippemt_type"/></div>RMB Exchange </label>
                <label><div className="input_container"><input type='radio' name="shippemt_type"/></div>Container Clearence or Booking </label>
              </section>
            </div>

            


            

            
          </div>
              <textarea className="textArea" placeholder='Message'></textarea>
          </form>
  )
}

export default ContactUs