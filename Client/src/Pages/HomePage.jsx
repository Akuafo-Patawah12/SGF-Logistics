import React,{useState,useRef,useEffect,useMemo,Suspense, lazy} from 'react'
import {motion,useAnimation} from "framer-motion"

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

import {  PlayCircleFilled } from '@ant-design/icons'

import HowItWorksVideo from '../Components/HowItWorksVideo'
import EndUsersIcon from '../Icons/EndUsersIcon'
const  ServicesComponent= lazy(()=> import( '../Components/ServicesComponent'))
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


 const parentRef = useRef(null);

  const childRef1 = useRef(null);
  const childRef2 = useRef(null);
  const childRef3 = useRef(null);
  const childRef4 = useRef(null);
  

  const [index,setIndex]= useState(0)
  const [disable,setDisable] = useState(false)

  
  useEffect(()=>{
    
    const auto_slider=setInterval(()=>{
      setIndex(prev => prev + 1)
    },5000)

    const parent= parentRef.current
    const child= [
      childRef1.current,
      childRef2.current,
      childRef3.current,
      childRef4.current,
      ""
    ]
     
    if(index===0){
      setDisable(true)
    }else{
      setDisable(false)
    }
    index >= child.length-1 ? setIndex(0): setIndex(index);
    
    const childLeft = child[index].offsetLeft;
    parent.scrollTo({
      left: childLeft,
      behavior: "smooth" // Add smooth scrolling
    });

    return()=>{
       clearInterval(auto_slider)
    }
  },[index])

  const [divWidth, setDivWidth] = useState(0);

useEffect(() => {
  const handleResize = () => {
    if (parentRef.current) { 
      setDivWidth(parentRef.current.offsetWidth);
    }
  };

  window.addEventListener('resize', handleResize);

  // Initial measurement
  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [divWidth]);
  
 const testimonials = [
  {
    name: 'Linda Asare',
    role: 'Operations Manager at DEF Enterprises',
    text: 'The real-time tracking feature is invaluable. It gives us the peace of mind of knowing exactly where our goods are at all times.',
    
  },
  {
    name: 'Kwame Mensah',
    role: 'CEO of ABC Trading',
    text: 'SF Ghana Logistics has become an indispensable part of our supply chain. Their dedication to efficiency and reliability is unparalleled.',
    
  },
  {
    name: 'Akuafo Patawah',
    role: 'Owner of Techscroww',
    text: 'Exceptional service and timely deliveries! SFGL truly lives up to its motto, "Whatever the load, we carry it."',
    
  },
];

const [value, setValue] = useState(0);  // State to hold the value
  const controls = useAnimation();  // Controls for the animation
  const divRef = useRef(null);  // Ref for the div

  let timer;
  function name() {
    if (timer) return; // Prevent multiple intervals from being set
    timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= 6000) {
          clearInterval(timer);  // Clear interval when value reaches 200
          return prev;
        }
        return prev + 20;
      });
    },500);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          // Call the function when 50% of the div is in the viewport
          name();
          controls.start({ opacity: 1 });
        }
      },
      { threshold: [0.5] } // 50% threshold for intersection
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [controls,value]);

  const images = [
    { src: "/SFG_images/Air.jpg", title: "Reliable Sea Freight Services" },
    { src: "/SFG_images/Sea.jpg", title: "Optimized Freight Forwarding Services" },
    { src: "/SFG_images/Slider2.jpg", title: "Real-Time Shipment Tracking & Visibility " },
    { src: "/SFG_images/Slider3.jpg", title: "Efficient Air Freight Solutions" },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
    


  
  
  const transition = useMemo(() => ({
    duration: 0.5,
    ease: "easeOut"
  }), []);
  


  return (
    
    <div
    
     style={{overflow:"hidden",background:"#fff"}} className='Home'>
        <div style={{position:"relative"}}>
        <div className='Image_Text'>
          
          
          <section style={{display:"flex",gap:"1rem"}}>
            <button onClick={()=> setIsVideo(true)} style={{border:"none",background:"transparent",isolation:"isolate" ,display:"flex",justifyContent:"center",alignItems:"center"}} className='how_it_works'><span style={{color:"#5cbbf1",fontSize:"x-large"}}><PlayCircleFilled /> </span><span className="btn1" style={{color:"white",background:"#A7C756",padding:"10px",borderRadius:"5px",marginLeft:"20px",fontSize:"18px"}}>How It Works?</span></button>
          </section>
          </div>
      <div
        ref={parentRef}
        className="slide-show"
        style={{
          width: "100%",
          height: "450px",
          
        }}
      >
        
       
        <div ref={childRef1} style={{position:"relative"}}>
          <div className="cover">
            
          <motion.div
       
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: -100 }} 
              transition={transition} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.2 }}
            >
            
            <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Reliable Shipping Services Between China and Ghana. </p>
   
            </motion.div>
          </div>
          <LazyLoadImage
          
          
      
       src='/SFG_images/slider1.webp' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }}  />
       </div>

       <div ref={childRef2} style={{position:"relative"}}>
        <div className="cover">
        <motion.div
       
       initial={{ opacity: 0, x:-100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={transition} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
           >
            
          <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Track your shipment in real-time! With SF Ghana Logistics, know exactly where your cargo is at every moment.</p>
       </motion.div>
        </div>
       <LazyLoadImage src='/SFG_images/Slide_Plane.webp' width={divWidth} effect='blur' style={{ objectFit: "cover", height: '450px'}}  />
       </div>
         
         <div ref={childRef3} style={{position:"relative"}} >
          <div className="cover">
          <motion.div
       
       initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={transition} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
           >
           
           <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Reliable logistics, no matter the load.</p>
           </motion.div>
          </div>
          <LazyLoadImage src='/SFG_images/Seaport.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }}  />
          </div>

          <div ref={childRef4} style={{position:"relative"}} >
          <div className="cover">
          <motion.div
       
       initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={transition} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
            >

             <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Experience top-notch logistics with SF Ghana Logistics.</p>
             
          </motion.div>
        </div>
            <LazyLoadImage src='/SFG_images/Ware.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }} /> 
          </div>
          
        
      </div>
      </div>
      

      <p className='Description' style={{position:"relative",isolation:"isolate"}}>We're fast, efficient, cost-effective, and reliable in all areas of shipping, freight forwarding, free procurement and sourcing training, container clearance, and groupage services.  
         
      </p> 
      
      <section className='welcome_hero' >

            
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }} 
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }} // Trigger when 50% in view
          className='welcome_container' >
            <section style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"10px"}}>
                <div className="flexbox_1" style={{height:"80px",width:"95%",marginInline:"auto",borderRadius:"5px"}}><div> <p style={{color:"white"}}>Join us for <br/> seamless logistics.</p><Link to={"/Auth/login"}><button>Login</button></Link></div> </div>
                <div  className="flexbox_1" style={{height:"80px",width:"95%",marginInline:"auto",borderRadius:"5px"}}><div> <p className="p-info" style={{color:"white"}}>Track your shipment. <br/> in realtime </p><Link to={"/More/Track_order"}><button>Track</button></Link></div> </div>
            </section>
           <h3 style={{marginLeft:"2.5%",marginTop:"30px"}}>Welcome to SF Ghana Logistics.</h3>
          <p style={{textAlign:"justify",marginInline:"auto",marginTop:"10px",width:"95%",fontSize:"0.9rem"}}>
            Your trusted partner in providing seamless and reliable shipping solutions between Ghana and 
            China. Whether you require air cargo services, groupage shipping, or door-to-door delivery. Discover our comprehensive range of services designed to meet your logistics needs 
            and experience the SFGL difference. 
          </p>
          <button className='welcome_button'><Link to={"/Auth/sign_up"} className='welcome_butt'><span>GET STARTED</span>
          <div className='liquid'></div></Link></button>
         </motion.div>
      


         <div className='welcome_image'>
         <LazyLoadImage src="/SFG_images/Get_in_Touch.webp" alt="welcome image"  style={{width:"100%",height:"100%"}}/>
             <div title="welcome image"></div>
         </div>

      </section>

        <div style={{marginInline:"auto",width:"290px",}}>
      <h3 style={{color:"#1C1818",marginLeft:"0",display:"flex",gap:"10px",width:"fit-content",textAlign:"center",marginTop:"100px",fontSize:"25px"}}>OUR MAJOR
          <div className="content">
              <h3>SERVICES.</h3>
              <h3>SERVICES.</h3>
          </div>
      </h3>
      </div>
        

     
      <div style={{width:"100px",height:"2px",background:"#1C1818",marginInline:"auto",marginTop:"4px"}}></div>

      <p className="Service-title">Fast and Affordable Services.</p>
       <p style={{marginInline:"auto",width:"90%",marginBlock:"10px 30px",textAlign:"center",fontWeight:"600"}}>We offer a complete range of logistical solutions to suit importers and shippers worldwide.</p>
             <Suspense fallback="Loading...">
             <ServicesComponent />
             </Suspense>
             <div style={{paddingBlock:"30px",display:"flex",textDecoration:"none",alignItems:"flex-start",justifyContent:"center",height:"100px" ,background:"#a0c444",}}><Link to={"/Services"} style={{border:"2px solid #444",borderRadius:"5px",marginInline:"auto",padding:"10px 7px"}}>  SEE ALL OUR SERVICES</Link></div>
       
      

       <div></div>



        <div>
      <div className="image-container">
        <div className="scrolling-content">
         
          
          <h2 className="assist">Do you need assistance?</h2>
          <p>
            We’re here to provide you with the support and information you 
            need to make your logistics experience seamless and efficient.

          </p>
          

          <Link to="/Contact"><button className="scroll-content-btn">Contact Us</button></Link>
        </div>
        </div>
        </div>
    
        <h3 style={{color:"#1C1818",marginInline:"auto",width:"fit-content",marginTop:"30px"}} className='testimonial_head'>Clients Testimonals</h3>

        <div className="testimonial-container">
        <div className='bubbles'>
        <div className="bubbles-container">
      {Array.from({ length: 30 }).map((_, index) => (
        <Web3star className="bubble" key={index}/>
      ))}
    </div>
    </div>
      {testimonials.map((testimonial, index) => (
        <div className="testimonial" key={index}>
          
          <div style={{marginBlock:"30px"}}><StarHollow /> <StarHollow /> <StarHollow /> <StarHollow /> <StarHollow /></div>
          <div className="testimonial-content">
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-name">{testimonial.name}</p>
            <p className="testimonial-role">{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
  

    <p id="why_choose_us" style={{marginInline:"auto" ,width:"fit-content",marginBlock:"20px",fontSize:"30px" ,fontWeight:"500"}}>WHY CHOOSE US?</p>
       <p
  style={{
    width: "90%",
    background: " #E6E6FA", // Light purple background
    color: "#444",
    borderRadius: "7px",
    border: "1px solid #f0a7f0", // Slightly deeper purple border
    fontSize: "15px",
    fontWeight: "400",
    padding: "20px 10px",
    textAlign: "justify",
    marginInline: "auto",
    marginBottom:"20px"
  }}
>
  At SF Ghana Logistics (SFGL), we are committed to delivering exceptional logistics 
  solutions tailored to your specific needs. Here's why we stand out in the industry:
</p>

       <div style={{display:"flex",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#A7C756"}}></div>

       <div className='why'>
       <motion.div
        ref={divRef}
        animate={controls}
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: -100 }} 
              transition={transition} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.5 }}

       >

       <div className='scattered'>
        <section>
        
            <p style={{marginInline:"auto",width:"fit-content"}}><img src="/SFG_images/money-bag.webp" alt="Fallback GIF" style={{width:"100px",height:"100px"}} /></p>
              <h4 style={{marginInline:"auto",width:"fit-content"}}>Competitive Pricing</h4>
              
          
        </section>
        <section>
        
            <div style={{marginInline:"auto",width:"max-content"}}><img src="/SFG_images/container.webp" alt="Fallback GIF" style={{width:"100px",height:"100px"}} /></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Expert Handling</h4>
              
           
        </section>
        <section>
        
            <div style={{marginInline:"auto",width:"fit-content"}}><img src="/SFG_images/route.webp" alt="Fallback GIF" style={{width:"100px",height:"100px"}} /></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Timely Delivery</h4>
              
        </section>
        <div className="bar"></div>


        </div>

        <div className='rate'>
           <div style={{borderRight:"1px solid #222"}}><CargoShip style={{transform:"translateX(3px)"}}/> <br/><span style={{fontSize:"14px",color:"#111"}}>SEA FREIGHT</span><br/><span style={{fontSize:"14px",fontWeight:"500",color:"#111"}}> $ {rate[0]?.Sea_freight} PER CBM</span></div>
           <div style={{borderRight:"1px solid #222"}}><CargoPlane style={{transform:"translateX(3px)"}}/><br/><span style={{fontSize:"14px",color:"#111"}}>AIR FREIGHT</span> <br/><span style={{fontSize:"14px",fontWeight:"500",color:"#111"}}>$ {rate[0]?.Air_freight} PER KILO</span></div>
           <div><RMBrate style={{transform:"translateX(1px)"}}/><br/><span style={{fontSize:"14px",color:"#111"}}>RMB RATE</span><br/><span style={{fontSize:"14px",fontWeight:"500",color:"#111"}}>{rate[0]?.RMB_rate}</span></div>
        </div>

      </motion.div>
        

      <div className='Why_choose_slider'>
      <div style={{ marginTop:"50px",border:"3px solid #a0c444",borderRadius:"8px",paddingBottom: "5px",width:"100%"}} >
       

      <div className="carousel">
      <button className="carousel_button prev" onClick={prevSlide}>&#10094;</button>

      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? "active1" : ""}`}
          >
            <img src={image.src} alt={image.title} />
            <h2 className="carousel-title">{image.title}</h2>
          </div>
        ))}
      </div>

      <button className="carousel_button next_1" onClick={nextSlide}>&#10095;</button>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active1" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>


       <motion.div
        ref={divRef}
        animate={controls}
        initial={{ opacity: 0, x: 100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: 100 }} 
              transition={transition} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.5 }}

        style={{textAlign:"center",paddingBlock:"20px",width:"98%",marginInline:"auto",borderRadius:"8px", backgroundColor: '#a0c444', fontSize:"22px",fontWeight:"bold"}}
      >
       <EndUsersIcon /> <p><span style={{fontSize:"30px"}}>{value}+ </span> <br/> Satisfied customers</p>
      </motion.div>
        </div>
      </div>
      </div>
       <div style={{display:"flex",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#a0c444"}}></div>
      
    </div>
  )
}

export default HomePage