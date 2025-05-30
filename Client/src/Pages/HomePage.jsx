
{/* 
  List of sub sections for easy navigation:
  1. Hero section
  2. About section
  3. Services section
  4. Why choose us section
*/}

import React,{useState,useRef,useEffect,useMemo,Suspense, lazy} from 'react'
import {motion,useAnimation} from "framer-motion"
import { Plane, Ship, ShoppingCart, Layers,PackageSearch,DollarSign } from 'lucide-react';
import  Rocket from "../assets/Rocket.svg"
import  Handshake from "../assets/Handshake.svg"
import  Shield from "../assets/Shield.svg"
import Team from "../assets/Team.svg"
import Delivered from "../assets/Delivered.svg"
import Ship1 from "../assets/Ship1.svg"
import Correct from "../assets/Correct.svg"
import Star from "../assets/Star.svg"
import Home from "../assets/Home.svg"
import Load from "../assets/Load.svg"
import  Web3star from "../Icons/Web3star" 
import Truck  from "../Icons/Truck"
import Anchor  from "../Icons/Anchor"

import Container  from "../Icons/Container"

import CargoShip from "../Icons/CargoShip"
import  StarHollow  from "../Icons/StarHollow"
import CargoPlane  from "../Icons/CargoPlane"
import RMBrate  from "../Icons/RMBrate"

 
import "../Styles/Home.css"

import "../Styles/AnimatedBubbles.css"
import io from "socket.io-client"

import {Link} from "react-router-dom"
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'; 



const HomePage = ({setIsVideo}) => {
  const socket= useMemo(() => io("https://api.sfghanalogistics.com",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

 const [ rate, setRate] = useState([]);
useEffect(()=>{
  socket.emit("greet", "hello world")
  
  socket.emit("getRates","data",(response)=>{
    if(response.status==="ok"){
    setRate(response.data)
    }
  })
  console.log(socket)
},[socket])


  useEffect(()=>{
    socket.on("connection",()=>{
      console.log("connected to the default namespace")
    })

   socket.on("orderUpdated",(data)=>{
    setRate([data])
   })
    
    socket.on("disconnect",(reasons)=>{
        console.log(reasons)
    })
    
   
    return()=>{
       socket.off("connection")
       socket.off("orderUpdated")
       socket.off("disconnect")
    }
 },[socket])


 
 
  

  

  return (
    
  <main style={{overflow:"hidden",background:"#fff"}} >
       
  {/* Hero section */}

    <section style={{background:"#E4D6ED",height:"500px",width:"100%",backgroundImage: "url('../assets/Load.svg')"}}>
       
    </section>  
     
  <section style={{position:"relative",height:"100px",overflow:"hidden"}}>
    <img src="./favicon.jpg" alt="logo" style={{position:"absolute",top:"90px",left:"50%",width:"200px",transform:"translate(-50%,-50%)"}}/>
  </section>
  {/* About section */}
    <section style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",paddingInline:"10%",marginBlock:"60px",gap:"20px",paddingBlock:"20px",borderRadius:"30px",}}>

      {/* About section One*/}
      <div>
        <h1 style={{fontSize:"20px",color:"var(--purple)"}}>About SF Ghana Logistics</h1>
        <p style={{fontSize:"16px",color:"#555"}}>
          At SF Ghana Logistics, we are committed to delivering reliable, efficient, and innovative logistics solutions across Ghana and beyond. With a strong foundation in supply chain excellence, we specialize in sea freight, air freight, door-to-door delivery, and procurement services, ensuring that every shipment reaches its destination safely and on time.
        </p>

        <div style={{display:"flex",marginTop:"50px",alignItems:"center",}}>
          <button className='welcome_button'><Link to={"/Auth/sign_up"} className='welcome_butt'><span style={{fontSize:"15px"}}>GET STARTED</span>
          <div className='liquid'></div></Link></button>
          
          <div style={{height:"4px",width:"30px",background:"#777"}}></div>
          <button className='welcome_button' onClick={()=> setIsVideo(true)}><span style={{fontSize:"15px"}}></span></button>
          <div style={{height:"40px",width:"40px",borderRadius:"50% ",background:"#FFEAFE",border:"3px solid #ec7df3",display:"flex",alignItems:"center",justifyContent:"center"}}><img src={Ship1} style={{marginInline:"auto",height:"20px",width:"20px"}} alt="home-icon" /></div>
          <div style={{height:"4px",width:"30px",background:"#777"}}></div>
          <div style={{height:"40px",width:"40px",borderRadius:"50%",background:"#FFEAFE",border:"3px solid #ec7df3",display:"flex",alignItems:"center",justifyContent:"center"}}><img src={Home} style={{marginInline:"auto",height:"20px",width:"20px"}} alt="home-icon"/></div>
        </div>
      </div>

      {/* About section Two*/}
      <div style={{display:"flex",flexDirection:"column",gap:"20px",border:"2px solid #ec7df3",borderRadius:"15px",background:"#FFEAFE",justifyContent:"space-around",alignItems:"center",paddingBlock:"20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",background:"#fff",width:"90%",padding:"25px 5%",boxShadow:"2px 3px 3px  #ddd",marginInline:"auto",borderRadius:"20px",alignItems:"center"}}>
           <div style={{display:"flex",gap:"10px",justifyContent:"center",alignItems:"center"}}><div style={{height:"40px",display:"flex",width:"40px",borderRadius:"50% ",background:"#B4E3CA",border:"3px solid #14AE5C",justifyContent:"center",alignItems:"center"}}><img src={Correct} alt='Correct' style={{height:"20px",width:"20px"}}/></div> <h3 style={{fontSize:"15px"}}>Delivered <br/>Shipment</h3></div>
            <p style={{fontSize:"20px",fontWeight:"700",color:"#e521f3"}}>5K+</p>
        </div>
        <div>
          <img src={Delivered} alt="Delivered" style={{width:"150px",height:"150px"}} />
        </div>
      </div>
    </section> 
        

  {/* Services section */}
    <section className="services_container" style={{paddingBottom:"50px",borderRadius:"30px" ,overflow:"hidden"}}>
       <div  style={{position:"relative",backgroundImage:"url(/SFG_images/Plane.jpg)",backgroundSize:"cover",backgroundPosition:"center",marginBottom:"50px"}}>
          <div  style={{paddingBlock:"20px",textAlign:"center",background: "linear-gradient(to bottom, rgba(229, 33, 243, 0.8) 29%, rgba(218, 130, 226, 0.8) 59%)",backdropFilter:"blur(5px)"}}>
            <h1 style={{fontSize:"30px",fontWeight:"700",textAlign:"center"}}>Our Services</h1>
            <p style={{textAlign:"center",fontSize:"16px",width:"50%",marginInline:"auto"}}>
              We offer a wide range of logistics services to meet your needs, from air and sea freight to door-to-door delivery.
            </p>
          </div>
          
       </div>
       <div style={{display:"grid",gap:"20px",gridTemplateColumns:"repeat(4,1fr)",paddingInline:"5%",justifyContent:"center",alignItems:"center",paddingBlock:"20px"}}>
       {/* Services section One*/}
       <div>
         <img style={{borderRadius:"20px",width:"100%",height:"200px",objectFit:"cover"}} src="/SFG_images/Air.jpg" alt=""/>
         <div style={{display:"flex",justifyContent:"space-between",padding:"10px",border:"2px solid #ec7df3",marginTop:"30px",borderRadius:"50px",background:"#fff",alignItems:"center"}}>
          <p style={{fontSize:"15px"}}>Air freight</p>
          <button title='learn more' style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#E6E6E6",height:"30px",width:"30px",borderRadius:"50%",background:"#e521f3"}}><Plane size={15}/></button>
         </div>  
       </div>

        

       {/* Services section Two*/}
       <div>
         <img style={{borderRadius:"20px",width:"100%",height:"200px",objectFit:"cover"}} src="/SFG_images/Air2.jpg" alt=""/>
         <div style={{display:"flex",justifyContent:"space-between",padding:"10px",border:"2px solid #ec7df3",marginTop:"30px",borderRadius:"50px",background:"#fff",alignItems:"center"}}>
          <p style={{fontSize:"15px"}}>Sea freight</p>
          <button title='learn more' style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#E6E6E6",height:"30px",width:"30px",borderRadius:"50%",background:"#e521f3"}}><Ship size={15}/></button>
         </div>  
       </div>

       {/* Services section Three*/}
       <div>
         <img style={{borderRadius:"20px",width:"100%",height:"200px",objectFit:"cover"}} src="/SFG_images/container1.jpg" alt=""/>
         <div style={{display:"flex",justifyContent:"space-between",padding:"10px",border:"2px solid #ec7df3",marginTop:"30px",borderRadius:"50px",background:"#fff",alignItems:"center"}}>
          <p style={{fontSize:"15px"}}>Groupage services</p>
          <button title='learn more' style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#E6E6E6",height:"30px",width:"30px",borderRadius:"50%",background:"#e521f3"}}><Layers size={15}/></button>
         </div>  
       </div>

       {/* Services section Four*/}
       <div>
         <img style={{borderRadius:"20px",width:"100%",height:"200px",objectFit:"cover"}}  src="/SFG_images/Door-to-door.jpg" alt=""/>
         <div style={{display:"flex",justifyContent:"space-between",padding:"10px",border:"2px solid #ec7df3",marginTop:"30px",borderRadius:"50px",background:"#fff",alignItems:"center"}}>
          <p style={{fontSize:"15px"}}>Procurement</p>
          <button title='learn more' style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#E6E6E6",height:"30px",width:"30px",borderRadius:"50%",background:"#e521f3"}}><ShoppingCart size={16} /></button>
         </div>  
       </div>
      </div>
    </section>
  
   
  {/* Why choose us section */}
    <h3 style={{margin:"30px auto",width:"fit-content",fontSize:"40px",fontWeight:"800"}}>Why Choose Us?</h3>
    <p style={{marginInline:" auto",width:"fit-content"}}>
      Trusted, fast, and customer-focused we deliver your goods with care and precision.
    </p>
    <div style={{
      display: "flex",
      
      alignItems: "center",
      padding: "40px 16px",
      fontFamily: "Inter, sans-serif",
      background: "#fdfdfd",
    }}>
      {/* Decorative separator */}
      <div style={{
        width: "20%",
        height: "4px",
        background: "linear-gradient(to right, #ccc, #aaa, #ccc)",
        
        borderRadius: "4px"
      }} />

      {/* Rates Card */}
     <div style={{
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.2)",
      padding: "24px 40px",
      width: "60%",
      margin: "0px auto",
      borderRadius: "20px",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      gap: "40px",
      color: "#111",
      overflow: "hidden",
    }}>
      {/* Gradient glow border */}
     

      {/* Left: Title */}
      <div style={{
        fontSize: "22px",
        fontWeight: 700,
        flex: 1,
        color: "#1e1e1e"
      }}>
        Affordable Rates
      </div>

      {/* Center: CBM */}
      <div style={{
        textAlign: "center",
        flex: 1,
        transition: "transform 0.3s ease",
      }}>
       <section style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <PackageSearch size={30} color="#6366f1" style={{ marginBottom: "8px" }} />
        <div style={{ fontSize: "16px", fontWeight: "500", color: "#4F46E5" }}>CBM Rate</div>
        <div style={{ fontSize: "15px", fontWeight: "bold" }}>22.07</div>
       </section>
      </div>

      {/* Right: RMB */}
      <div style={{
        textAlign: "center",
        flex: 1,
        transition: "transform 0.3s ease",
      }}>
      <section style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <DollarSign size={30} color="#10B981" style={{ marginBottom: "8px" }} />
        <div style={{ fontSize: "16px", fontWeight: "500", color: "#10B981" }}>RMB Rate</div>
        <div style={{ fontSize: "15px", fontWeight: "bold" }}>14.02</div>
       </section>
      </div>
    </div>

      {/* Decorative separator */}
      <div style={{
        width: "20%",
        height: "4px",
        background: "linear-gradient(to right, #ccc, #aaa, #ccc)",
       
        borderRadius: "4px"
      }} />
    </div>

    <div className='why_choose_us' style={{justifyContent:"space-around"}}>
        {/* Why choose us section One */}
       <section >
           <div style={{paddingBlock:"10px",width:"250px",borderBottom:"3px solid var(--purple)"}}>
             <h1 style={{fontSize:"30px",fontWeight:"600",color:"var(--purple)"}}>100%</h1>
             <p style={{fontSize:"16px"}}>Customer Satisfaction</p>
           </div>
           <div style={{paddingBlock:"10px",width:"250px",borderBottom:"3px solid var(--purple)"}}>
             <h1 style={{fontSize:"30px",fontWeight:"600",color:"var(--purple)"}}>98%</h1>
             <p style={{fontSize:"16px"}}>Best Logistics Offers</p>
           </div>
           <div style={{paddingBlock:"10px",width:"250px",borderBottom:"3px solid var(--purple)"}}>
             <h1 style={{fontSize:"30px",fontWeight:"600",color:"var(--purple)"}}>99%</h1>
             <p style={{fontSize:"16px"}}>Secure Handling</p>
           </div>
           <div style={{paddingBlock:"10px",width:"200px"}}>
             <div style={{ position: "relative", height: "36px", width: "144px" }}>
  <img
    src="/SFG_images/Air.jpg"
    loading="lazy"
    alt="air"
    style={{
      height: "32px",
      width: "32px",
      border: "2px solid white",
      borderRadius: "9999px",
      position: "absolute",
      left: "0px",
      zIndex: 10,
    }}
  />
  <img
    src="/SFG_images/Air2.jpg"
    loading="lazy"
    alt="air2"
    style={{
      height: "32px",
      width: "32px",
      border: "2px solid white",
      borderRadius: "9999px",
      position: "absolute",
      left: "20px",
      zIndex: 20,
    }}
  />
  <img
    src="/SFG_images/Air2.jpg"
    loading="lazy"
    alt="air2"
    style={{
      height: "32px",
      width: "32px",
      border: "2px solid white",
      borderRadius: "9999px",
      position: "absolute",
      left: "40px",
      zIndex: 30,
    }}
  />
  <img
    src="/SFG_images/Air.jpg"
    loading="lazy"
    alt="air"
    style={{
      height: "32px",
      width: "32px",
      border: "2px solid white",
      borderRadius: "9999px",
      position: "absolute",
      left: "60px",
      zIndex: 40,
    }}
  />

   <div
    
    
    
    style={{
      height: "29px",
      width: "29px",
      outline: "2px solid white",
      border: "2px solid #667",
      borderRadius: "9999px",
      position: "absolute",
      background: "#888",
      left: "80px",
      fontSize: "15px",
      textAlign: "center",
      lineHeight: "29px",
      zIndex: 50,
    }}
  >
   9+
  </div>
  
</div>
<p style={{fontSize:"16px"}}>Experienced Team</p>
           </div>
       </section>

       {/* Why choose us section Two*/}
       <section style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px",justifyContent:"center"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingBlock:"20px",width:"200px",borderRadius:"10px",background:"#FFEAFE",border:"2px solid #ec7df3"}} className='bg-purple-200'>
            <img src={Rocket} alt="rocket" style={{width:"60px",height:"60px"}} />
            <p style={{fontSize:"15px",fontWeight:"bold"}}>Fast & reliable</p>
            <div style={{display:"flex",gap:"5px"}}>
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingBlock:"20px",width:"200px",borderRadius:"10px",background:"#FFEAFE",border:"2px solid #ec7df3"}}>
            <img src={Handshake} alt="Handshake" style={{width:"60px",height:"60px"}} />
            <p style={{fontSize:"15px",fontWeight:"bold"}}>Best Logistics Offers</p>
            <div style={{display:"flex",gap:"5px"}}>
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingBlock:"20px",width:"200px",borderRadius:"10px",background:"#FFEAFE",border:"2px solid #ec7df3"}}>
            <img src={Shield} alt="Shield" style={{width:"60px",height:"60px"}} />
            <p style={{fontSize:"15px",fontWeight:"bold"}}>Secure & safe</p>
            <div style={{display:"flex",gap:"5px"}}>
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingBlock:"20px",width:"200px",borderRadius:"10px",background:"#FFEAFE",border:"2px solid #ec7df3"}}>
            <img src={Team} alt="Team" style={{width:"60px",height:"60px"}} />
            <p style={{fontSize:"15px",fontWeight:"bold"}}>Experienced Team</p>
            <div style={{display:"flex",gap:"5px"}}>
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
            </div>
          </div>
       </section>
    </div>
    

      
       <div style={{display:"flex",alignItems:"center",paddingBlock:"50px",justifyContent: "space-around",background:"#6e11b0"}}>
           <section style={{display:"flex",gap:"15px",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100px",height:"100px",color:"#fff"}}>
              <h3 style={{color:"oklch(90.2% 0.063 306.703)",fontSize:"30px"}} >3K+</h3>
              <p style={{textAlign:"center",fontSize:"16px"}}>Satisfied Customers</p>
           </section>

           <section style={{display:"flex",gap:"15px",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100px",height:"100px",color:"#fff"}}>
              <h3 style={{color:"oklch(90.2% 0.063 306.703)",fontSize:"30px"}}>50+</h3>
              <p style={{textAlign:"center",fontSize:"16px"}}>Global partners</p>
           </section>

           <section style={{display:"flex",gap:"15px",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100px",height:"100px",color:"#fff"}}>
              <h3 style={{color:"oklch(90.2% 0.063 306.703)",fontSize:"30px"}}>5K+</h3>
              <p style={{textAlign:"center",fontSize:"16px"}}>Delivered Shipments</p>
           </section>
       </div>
      
    </main>
  )
}

export default HomePage