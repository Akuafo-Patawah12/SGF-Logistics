import React from 'react'
import { motion } from 'framer-motion'
import { useLocation,Link } from 'react-router-dom'
import "../Home.css"

const ServicesComponent = () => {
   const location = useLocation();
  return (
    <motion.section
          initial={{ opacity: 0, y: 100 }} // Start off-screen to the left (-200px)
          whileInView={{ opacity: 1, y: 0 }} // Animate to the original position (x: 0)
          exit={{ opacity: 0, y: 100 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
          viewport={{ once: true, amount: 0.3 }}
          style={{marginBottom:"0"}}
       className={`services `} >
          
          <div
              
              style={{position:"relative"}} className="hover_parent parent1">
                <img src='./SFG_images/Sea.jpg' alt=''></img>
                <div  className="hover_to_display0">
                <h4 style={{color:"white",marginTop:"5px",fontSize:"27px"}}>Sea Freight</h4><br/>
                <Link to={"/Services/SeaFreight"}> <button>View More</button></Link>
                </div>
             </div>
   


          <div style={{position:"relative"}}  className="hover_parent parent2">
             <img src='./SFG_images/Air.jpg' alt=''></img>
             <div  className="hover_to_display">
             <h4 style={{color:"white",marginTop:"5px",fontSize:"27px"}}>Air Freight</h4><br/>
             <Link to={"/Services/AirFreight"}><button>View More</button></Link>
             </div>
          </div>
          
          <div
             
           style={{position:"relative"}} className="hover_parent parent3">
            <img src='./SFG_images/Door-to-door.jpg' alt=''></img>
            <div className="hover_to_display">
            <h4 style={{color:"white",marginTop:"5px",fontSize:"27px"}}>Door-to-Door Delivery.</h4><br/>
            <Link to={"/Services/Door2Door"}> <button>View More</button></Link>
            </div>
          </div>

          <div
              
           style={{position:"relative"}} className="hover_parent parent1">
             <img src='./SFG_images/s.jpg' alt=''></img>
             <div  className="hover_to_display">
             <h4 style={{color:"white",marginTop:"5px",fontSize:"27px"}}>Container Clearance</h4><br/>
             <Link to={"/Services/Clearance"}><button>View More</button></Link>
             </div>
          </div>

          {location.pathname === "/Services" && (<div
              
              style={{position:"relative"}} className="hover_parent parent1">
                <img src='./SFG_images/procurement.jpg' alt=''></img>
                <div  className="hover_to_display">
                <h4 style={{color:"white",marginTop:"5px",fontSize:"27px"}}>Free Procurement & Sourcing Training</h4><br/>
                <Link to={"/Services/Procurement"}> <button>View More</button></Link>
                </div>
             </div>)}

             {location.pathname === "/Services" && (<div
              
              style={{position:"relative"}} className="hover_parent parent1">
                <img src='./SFG_images/Groupage.jpg' alt=''></img>
                <div  className="hover_to_display">
                <h4 style={{color:"white",marginTop:"5px",fontSize:"27px"}}>Groupage Services</h4><br/>
                <Link to={"/Services/Groupage"}> <button>View More</button></Link>
                </div>
             </div>)}
   
   
       </motion.section>
  )
}

export default ServicesComponent