import React,{useState,useRef,useEffect,useMemo} from 'react'
import {motion,useAnimation} from "framer-motion"
import "./Home.css"
import io from "socket.io-client"
import DeliveryIcon from "../Icons/DeliveryIcon"
import {Link} from "react-router-dom"
import MoneyIcon from "../Icons/MoneyIcon"
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'; 
import Authentication from "../Components/Authentication"
import { ArrowLeftOutlined, CloseOutlined, LeftCircleFilled,PlayCircleFilled,RightCircleFilled, StarFilled } from '@ant-design/icons'
import LiftIcon from '../Icons/LiftIcon'
import HowItWorksVideo from './Components/HowItWorksVideo'
import EndUsersIcon from '../Icons/EndUsersIcon'
import TrackingIcon from '../Icons/TrackingIcon'
import ServicesIcon from '../Icons/ServicesIcon'
import ServicesComponent from './Components/ServicesComponent'
const HomePage = ({setShowAuth,showAuth}) => {
  const socket= useMemo(() => io("http://localhost:4040",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

  
useEffect(()=>{
  socket.emit("greet", "hello world")
  console.log(socket)
},[socket])


  useEffect(()=>{
    socket.on("connection",()=>{
      console.log("connected to the default namespace")
    })


    
    socket.on("disconnect",(reasons)=>{
        console.log(reasons)
    })
    
   
    return()=>{
       socket.off("connection")
       socket.off("disconnect")
    }
 },[socket])
  
  


    const[text,setText]= useState("Open")



function changeText(){
  setText("David")
}

const [isVisible, setIsVisible] = useState(false);



  const parentRef = useRef(null);

  const childRef1 = useRef(null);
  const childRef2 = useRef(null);
  const childRef3 = useRef(null);
  const childRef4 = useRef(null);
  

  const [index,setIndex]= useState(0)

  const scrollToLeft = (n) => {

    setIndex(n)
  };


  const [disable,setDisable]= useState(false)
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

  function setindex(char){
    
  
    if(char==="+"){
        setIndex(prev=> prev + 1)
    }else{
      setIndex(prev=> prev - 1);
    }
    
  }


  
  

  const [isVideo,setIsVideo] = useState(false)

  const[seeMore,setSeeMore] =useState("Read More...")
  const[ see,setSee] = useState(false)

  function ToggleMore(){
    if(!see){
      setSeeMore("Read Less...")
      setSee(true)
    return
  }
  setSeeMore("Read More...")
  setSee(false)
}


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

const [displayService,setDisplayService]  = useState(false)
const[serviceText,setServiceText]= useState("SEE ALL OUR SERVICES")
function ToggleServices(){
  if(!displayService){
    setServiceText("SEE LESS...")
    setDisplayService(true)
  return
}
setServiceText("SEE ALL OUR SERVICES")
setDisplayService(false)
}


const image= ["Air.jpg","Sea.jpg","Slider2.jpg","Slider3.jpg"] 
  const [fadeIn, setFadeIn] = useState(false);
const[index1,setIndex1]= useState(0)
useEffect(()=>{
  
  const timer= setInterval(()=>{
     setIndex1(prev => prev + 1)
     setFadeIn(false)
  },4000)
    
    if(index >= image.length - 2){
      setIndex1(0)
    }
  return()=>{
    clearInterval(timer)
  }
},[index1])


const [value, setValue] = useState(1);  // State to hold the value
  const controls = useAnimation();  // Controls for the animation
  const divRef = useRef(null);  // Ref for the div

  let timer;
  function name() {
    if (timer) return; // Prevent multiple intervals from being set
    timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= 6) {
          clearInterval(timer);  // Clear interval when value reaches 200
          return prev;
        }
        return prev + 1;
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


  return (
    
    <div style={{overflow:"hidden",background:"#fff"}} className='Home'>
        {showAuth&& <Authentication  authShow={[showAuth,setShowAuth]}/>}
      <div
        ref={parentRef}
        className="slide-show"
        style={{
          width: "100%",
          height: "450px"
          
        }}
      >
        <div className='Image_Text'>
          
          
          <section style={{display:"flex",gap:"1rem"}}>
            <Link to={"/Orders"}><button className='btn'>Get A Quote</button></Link>
            <button onClick={()=> setIsVideo(true)} style={{border: "#5cbbf1",background:"transparent",isolation:"isolate" ,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{color:"#5cbbf1",fontSize:"x-large"}}><PlayCircleFilled /> </span><span className="btn1" style={{color:"white",background:"#A7C756",padding:"10px",marginLeft:"20px",fontSize:"18px"}}>How It Works?</span></button>
          </section>
          </div>
       
        <div ref={childRef1} style={{position:"relative"}}>
          <div className="cover">
            
          <motion.div
       
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: -100 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.2 }}
            >
            <p style={{color:"white",fontSize:"25px"}}>Logistics & Transportation.</p>
            <h3 style={{color:"white",fontSize:"35px"}}>World Wide Logistic And <br/>Professional <span style={{color:"red",fontSize:"inherit"}}>Solutions</span></h3>
            </motion.div>
          </div>
          <LazyLoadImage
          
          
      
       src='../SFG_images/slider1.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }}  />
       </div>

       <div ref={childRef2} style={{position:"relative"}}>
        <div className="cover">
        <motion.div
       
       initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
           >
            <h3 style={{color:"white"}}>Air Freight Services</h3>
          <p style={{color:"white",fontSize:"25px"}}>Our air freight services provide fast, reliable, and secure global shipping for your logistics needs.</p>
       </motion.div>
        </div>
       <LazyLoadImage src='../SFG_images/Slider4.jpg' width={divWidth} effect='blur' style={{ objectFit: "cover", height: '450px'}}  />
       </div>
         
         <div ref={childRef3} style={{position:"relative"}} >
          <div className="cover">
          <motion.div
       
       initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
           >
           <p style={{color:"white",fontSize:"25px"}}>Logistics & Transportation.</p>
           <h3 style={{color:"white",fontSize:"35px"}}>World Wide Logistic And <br/>Professional Solutions</h3>
           </motion.div>
          </div>
          <LazyLoadImage src='../SFG_images/Slider2.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }}  />
          </div>

          <div ref={childRef4} style={{position:"relative"}} >
            <div className="cover"></div>
            <LazyLoadImage src='../SFG_images/Slider3.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }} />

          </div>
          
          

          

      
        
      </div>
      <p className='Description' >We're fast, efficient, cost-effective, and reliable in all areas of shipping, freight forwarding, free procurement and sourcing training, container clearance, and groupage services.
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
                <div style={{height:"80px",width:"90%",background:"#bbb",borderRadius:"5px"}}></div>
                <div style={{height:"80px",width:"90%",background:"#bbb",borderRadius:"5px"}}> </div>
            </section>
           <h3>Welcome to SF Ghana Logistics.</h3>
          <p>
            Your trusted partner in providing seamless and reliable shipping solutions between Ghana and 
            China. Whether you require air cargo services, groupage shipping, or door-to-door delivery. Discover our comprehensive range of services designed to meet your logistics needs 
            and experience the SFGL difference. 
          </p>
          <Link><button className='welcome_button'>GET IN TOUCH</button></Link>
         </motion.div>
         <div className='welcome_image'>
         
         </div>
      </section>

      <h3 style={{color:"#1C1818",marginInline:"auto",width:"fit-content",textAlign:"center",marginTop:"20px",fontSize:"25px"}}>OUR MAJOR SERVICES.</h3>
      
      <div style={{width:"100px",height:"2px",background:"#1C1818",marginInline:"auto",marginTop:"4px"}}></div>

      <p className="Service-title">Fast and Affordable Services.</p>
       <p style={{marginInline:"auto",width:"90%",marginBlock:"10px 30px",textAlign:"center",fontWeight:"600"}}>We offer a complete range of logistical solutions to suit importers and shippers worldwide.</p>
             <ServicesComponent />

       

       <Link to={"/Services"} style={{display:"flex",textDecoration:"none",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#A7C756",paddingBottom:"20px"}}><button onClick={ToggleServices} style={{marginInline:"auto",background:"transparent",transition:"all 0.3s",height:"60px",border:"2px solid #222",borderRadius:"5px", padding:"10px",fontWeight:"700"}}>SEE ALL OUR SERVICES</button></Link>
      {displayService && <section className='services1'  >
       <div>
             <img src='./SFG_images/procurement.jpg' alt=''></img>
             <h4 style={{color:"white",marginTop:"5px",fontSize:"27px"}}>Free Procurement & Sourcing Training </h4><br/>
               <button>View More</button>
          </div>
          <div>
             <img src='./SFG_images/Air2.jpg' alt=''></img>
             <h4 style={{color:"white",marginTop:"5px",fontSize:"24px"}}>Container Clearance </h4><br/>
             <button>View More</button>
          </div>
          <div>
            <img src='./SFG_images/Groupage.jpg' alt=''></img>
            <h4 style={{color:"white",marginTop:"5px",fontSize:"24px"}}>Groupage Services </h4><br/>
            <button>View More</button>
          </div>
       </section> }

       
      <div className="image-container">
        <div className="scrolling-content">
        
          <h2 className="animator"></h2>
          <p>
            This content will scroll over the image as you scroll down the page.
          </p>
          

          <Link to={"/Contact_us"}><button className="scroll-content-btn">Contact Us</button></Link>
        </div>
        </div>


         <h3 style={{color:"#1C1818",marginInline:"auto",width:"fit-content",marginTop:"30px"}} className='testimonial_head'>Clients Testimonals</h3>
       <section className={`testimonals `} style={{display:"flex",justifyContent:"space-between",paddingInline:"2.5%",marginBlock:"30px"}}>
          <div>
          <span className="stars"><StarFilled /> <StarFilled /> <StarFilled /></span>
            <p className='quote'>The real-time tracking feature is invaluable. It gives us the peace of mind of knowing exactly 
               where our goods are at all times.</p>
               <h4 className="quote_name"><span style={{color:"#8B14B1"}}>—</span> Linda Asare, Operations Manager at DEF Enterprises </h4>
          </div>
          <div>
            <span className="stars"><StarFilled /> <StarFilled /> <StarFilled /></span>
            <p className='quote'>SF Ghana Logistics has become an indispensable part of our supply chain. Their dedication to 
            efficiency and reliability is unparalleled.</p>
            <h4 className="quote_name"><span style={{color:"#8B14B1"}}>—</span> Kwame Mensah, CEO of ABC Trading </h4>
          </div>
          <div>
             <span className="stars"><StarFilled /> <StarFilled /> <StarFilled /></span>
             <p className='quote'> Exceptional service and timely deliveries! SFGL truly lives up to its motto, 'Whatever the load, 
             we carry it.</p>
             <h4 className="quote_name"><span style={{color:"#8B14B1"}}>—</span> Michael Osei, Owner of GHI Retailers </h4>
          </div>
       </section>
       
       
       <p style={{marginInline:"auto" ,width:"fit-content",marginBlock:"20px",fontSize:"30px" ,fontWeight:"500"}}>WHY CHOOSE US.</p>
       <div style={{display:"flex",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#A7C756"}}></div>

       <div className='why'>
       <motion.div
        ref={divRef}
        animate={controls}
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: -100 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.2 }}
        
       className='scattered'>
        <section>
        
            <p style={{marginInline:"auto",width:"fit-content"}}><MoneyIcon /></p>
              <h4 style={{marginInline:"auto",width:"fit-content"}}>Competitive Pricing</h4>
              <p>
                  We pride ourselves on offering some of the most competitive rates in the market. At $250 
                  per CBM, we ensure our pricing structure is designed to provide value without sacrificing 
                  service quality.  
              </p>
          
        </section>
        <section>
        
            <div style={{marginInline:"auto",width:"max-content"}}><LiftIcon /></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Expert Handling</h4>
              <p>
                Entrusting your cargo to SFGL means relying on a team of seasoned professionals who 
                have extensive experience in the logistics industry. Our expert team handles your goods 
                with precision and care, from packaging and warehousing to transportation and delivery. 
                
              </p>
           
        </section>
        <section>
        
            <div style={{marginInline:"auto",width:"fit-content"}}><DeliveryIcon /></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Timely Delivery</h4>
              <p >
                When it comes to logistics, time is of the essence. SFGL has built a reputation for 
                punctuality and reliability, ensuring that your shipments arrive at their destination on 
                schedule.
              </p>
        </section>
      </motion.div>
      <div className='Why_choose_slider'>
      <div style={{ marginTop:"50px",border:"3px solid #A7C756",paddingBottom: "5px",width:"100%"}} >
       <div className='fade-image'>
          <img src={`./SFG_images/${image[index1]}`} alt="image"  className={fadeIn ? "":"fade_in"}/>
       </div>
       


       <motion.div
        ref={divRef}
        animate={controls}
        initial={{ opacity: 0, x: 100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: 100 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.5 }}

        style={{textAlign:"center",paddingBlock:"20px",width:"98%",marginInline:"auto", backgroundColor: '#A7C756', fontSize:"22px",fontWeight:"bold"}}
      >
       <EndUsersIcon /> <p><span style={{fontSize:"30px"}}>{value}K + </span> <br/> Satisfied users</p>
      </motion.div>
       </div>
      </div>
      </div>
       <div style={{display:"flex",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#A7C756"}}></div>
       {see && <section  className="why_choose_us ">
           <div>
            <div style={{marginInline:"auto",width:"fit-content"}}><EndUsersIcon /></div>
              <h4 style={{marginInline:"auto",width:"fit-content"}}>End-to-End Solutions:</h4>
              <p >
                  We offer comprehensive logistics services that cover every step of the supply chain—
                from customs clearance and regulatory compliance to warehousing and last-mile delivery. 
                  Our goal is to simplify the shipping process for you, allowing you to focus on your 
                  business while we handle the logistics.  
              </p>
           </div>
           <div>
            <div style={{marginInline:"auto"}}><TrackingIcon /></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Cutting-Edge Tracking</h4>
              <p >
                Transparency and real-time visibility are key to our operations. With our state-of-the-art 
                tracking system, you can monitor the progress of your shipment at every stage. This gives 
                you peace of mind knowing that your cargo is on the right path, with updates available 
                24/7 through our platform. 
              </p>
           </div>
            <div>
           <div style={{marginInline:"auto",width:"fit-content"}}><ServicesIcon /> </div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}> Customer-Centric Approach</h4>
              <p >
                  At SFGL, our customers are at the heart of everything we do. We tailor our services to 
                  meet your unique requirements, providing personalized support and maintaining open 
                  communication throughout the shipping process. Our dedicated customer service team is 
                  always available to assist with inquiries, offering prompt responses and solutions to 
                  ensure your satisfaction.  
              </p>
           </div>
          
           </section> }

        {isVideo && <div style={{position:"fixed",inset:"0",zIndex:"60",background:"rgb(0,0,0,0.9)",backdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <button onClick={()=> setIsVideo(false)} style={{background:"transparent",color:"#fff",border:"none",position:"absolute",top:"10px",right:"10px",fontSize:"30px"}}><CloseOutlined /></button>
           <HowItWorksVideo />
       </div>}
    </div>
  )
}

export default HomePage