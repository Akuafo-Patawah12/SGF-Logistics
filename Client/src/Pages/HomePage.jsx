import React,{useState,useRef,useEffect,useMemo} from 'react'
import "./Home.css"
import {io} from "socket.io-client"
import DeliveryIcon from "../Icons/DeliveryIcon"
import {Link} from "react-router-dom"
import MoneyIcon from "../Icons/MoneyIcon"
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'; 
import Authentication from "../Components/Authentication"
import { CloseOutlined, LeftCircleFilled,PlayCircleFilled,RightCircleFilled } from '@ant-design/icons'
import LiftIcon from '../Icons/LiftIcon'
import HowItWorksVideo from './Components/HowItWorksVideo'
const HomePage = ({setShowAuth,showAuth}) => {
  const socket1= useMemo(() => io("http://localhost:4040",{
    transports: ['websocket'],
  }),[])

  

  useEffect(()=>{
    socket1.on("connect",()=>{
      console.log("connected to the signup path")
    })
    socket1.on("disconnect",(reasons)=>{
        console.log(reasons)
    })
 
    return()=>{
       socket1.off("connection")
       socket1.off("disconnect")
    }
 },[socket1])
  
  


    const[text,setText]= useState("Open")



function changeText(){
  setText("David")
}

const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef(null);
const sectionRef1 = useRef(null);
const sectionRef2 = useRef(null);
const sectionRef3 = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      rootMargin: '0px', // Trigger when the element is in view
      threshold: 0.1,    // 10% of the element is visible
    }
  );

  if (sectionRef.current || sectionRef1.current || sectionRef2.current || sectionRef3.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    if (sectionRef.current) observer.unobserve(sectionRef.current);
  };
}, []);


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


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Function to update the width state when the window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);
  

  const [isVideo,setIsVideo] = useState(false)


  return (
    
    <div>
        {showAuth&& <Authentication  authShow={[showAuth,setShowAuth]}/>}
      <div
        ref={parentRef}
        className="slide-show"
        style={{
          width: "100%",
          height: "400px",
          
          whiteSpace: "nowrap",
          
        }}
      >
        <div className='Image_Text'>
          <section>
          <p>Logistics & Transportation.</p>
          <h3>World Wide Logistic And <br/>Professional Solutions</h3>
          </section>
          
          <section style={{display:"flex",gap:"1rem"}}>
            <button className='btn'>Get A Quote</button>
            <button onClick={()=> setIsVideo(true)} style={{border: "#5cbbf1",background:"transparent",display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{color:"#5cbbf1",fontSize:"x-large"}}><PlayCircleFilled /> </span><span style={{color:"white",background:"#A7C756",padding:"10px",marginLeft:"20px"}}>How It Works?</span></button>
          </section>
          </div>
       
        <div ref={childRef1} >
          <LazyLoadImage
          
          
      
       src='../SFG_images/slider1.jpg' width={windowWidth} effect='blur' style={{objectFit: "cover", height: '400px' }}  />
       </div>

       <div ref={childRef2} >
       <LazyLoadImage src='../SFG_images/Slider4.jpg' width={windowWidth} effect='blur' style={{ objectFit: "cover", height: '400px' }}  />
       </div>
         
         <div ref={childRef3} >
          <LazyLoadImage src='../SFG_images/Slider2.jpg' width={windowWidth} effect='blur' style={{objectFit: "cover", height: '400px' }}  />
          </div>

          <div ref={childRef4} >
          <LazyLoadImage src='../SFG_images/Slider3.jpg' width={windowWidth} effect='blur' style={{objectFit: "cover", height: '400px' }} />

          </div>
          
          <section className="slider">
             <button disabled={disable} style={{visibility:`${disable ? "hidden":"visible"}`}} onClick={()=> setindex('-')}><LeftCircleFilled/></button>
             <button onClick={()=> setindex('+')}><RightCircleFilled/> </button>
          </section>

          <section className="slide_btn">
            <button onClick={()=> scrollToLeft(0)}>  </button>
            <button onClick={()=> scrollToLeft(1)}>  </button>
            <button onClick={()=> scrollToLeft(2)}>  </button>
            <button onClick={()=> scrollToLeft(3)}>  </button>
      </section>

      
        
      </div>
      <h3 className='Description'>We're fast, Efficient, Cost effective and Reliable in all areas of shipping, freight forwarding 
          ,Free procurement and Sourcing Training, Container Clearance & Groupage Services.
      </h3>
      <section className='welcome_hero'>
            
   
         <div className='welcome_container' >
           <h3>Welcome to SF Ghana Logistics.</h3>
          <p>
            Your trusted partner in providing seamless and reliable shipping solutions between Ghana and 
            China. Whether you require air cargo services, groupage shipping, or door-to-door delivery,<span style={{color:"#35DFF7"}}> "SF 
            Ghana Logistics ensures that your goods are handled with the utmost care and delivered 
            promptly."</span> Discover our comprehensive range of services designed to meet your logistics needs 
            and experience the SFGL difference. 
          </p>
          <Link><button className='welcome_button'>GET IN TOUCH</button></Link>
         </div>
         <div className='welcome_image'>
         
         </div>
      </section>

      <h3 style={{color:"#1C1818",marginInline:"auto",maxWidth:"210px",textAlign:"center",marginTop:"20px"}}>OUR MAJOR SERVICES.</h3>
      <div style={{width:"100px",height:"2px",background:"#1C1818",marginInline:"auto",marginTop:"4px"}}></div>
       <p style={{marginInline:"auto",width:"fit-content",marginBlock:"10px"}}>We offer a complete range of logistical solutions to suit importers and shippers worldwide.</p>


       <setion className={`services ${isVisible ? 'fade-in' : ''}`} ref={sectionRef}>
          <div>
             <img src='./SFG_images/Sea.jpg' alt=''></img>
             <h4 style={{color:"white",marginTop:"5px"}}>Sea Freight</h4><br/>
             <p style={{color:"white"}}>We have the expertise to manage your large,over-sized 
                heavy,high-value or mission-critical piecies of cargo.
                Our reputation speaks for us.
             </p>
          </div>
          <div>
             <img src='./SFG_images/Air.jpg' alt=''></img>
             <h4 style={{color:"white",marginTop:"5px"}}>Air Freight</h4><br/>
             <p style={{color:"white"}}>SF Ghana handles Air freight for all clients who need fast
                reliable, and secure transportation of their goods. Ideal for high-priority
                or time-sensitive shipments.
             </p>
          </div>
          <div>
            <img src='./SFG_images/Door-to-door.jpg' alt=''></img>
            <h4 style={{color:"white",marginTop:"5px"}}>Door-to-Door Delivery.</h4><br/>
            <p style={{color:"white"}}>Our Door-to-Door Delivery Service offer a hassle-free solution 
               ,managing the entire logistics process from pickup to final delivery.
            </p>
          </div>
       </setion>



         <h3 style={{color:"#1C1818",marginInline:"auto",width:"fit-content",marginTop:"30px"}}>Clients Testimonals</h3>
       <section ref={sectionRef1} className={`testimonals ${isVisible ? 'fade-in' : ''}`} style={{display:"flex",justifyContent:"space-between",paddingInline:"2.5%",marginBlock:"30px"}}>
          <div>
            <p className='quote'>The real-time tracking feature is invaluable. It gives us the peace of mind of knowing exactly 
               where our goods are at all times.</p>
               <h4 className="quote_name"><span style={{color:"#8B14B1"}}>—</span> Linda Asare, Operations Manager at DEF Enterprises </h4>
          </div>
          <div>
            <p className='quote'>SF Ghana Logistics has become an indispensable part of our supply chain. Their dedication to 
            efficiency and reliability is unparalleled.</p>
            <h4 className="quote_name"><span style={{color:"#8B14B1"}}>—</span> Kwame Mensah, CEO of ABC Trading </h4>
          </div>
          <div>
             <p className='quote'> Exceptional service and timely deliveries! SFGL truly lives up to its motto, 'Whatever the load, 
             we carry it.</p>
             <h4 className="quote_name"><span style={{color:"#8B14B1"}}>—</span> Michael Osei, Owner of GHI Retailers </h4>
          </div>
       </section>

       <p style={{marginInline:"auto" ,width:"fit-content",marginBlock:"20px",fontSize:"25px" ,fontWeight:"500"}}>WHY CHOOSE US</p>
       <section ref={sectionRef2} className={`why_choose_us ${isVisible ? 'fade-in' : ''}`} style={{animation:`${isVisible ? "0.3s width" :"0.3s width "}`}}>
           <div>
            <div style={{marginInline:"auto",width:"fit-content"}}><MoneyIcon /></div>
              <h4 style={{marginInline:"auto",width:"fit-content"}}>Competitive Pricing</h4>
              <p >
                  We pride ourselves on offering some of the most competitive rates in the market. At $250 
                  per CBM, we ensure our pricing structure is designed to provide value without sacrificing 
                  service quality. Whether you’re shipping bulk goods or smaller consignments, our cost
                  effective solutions ensure that your logistics needs are met efficiently and affordably. 
              </p>
           </div>
           <div>
            <div style={{marginInline:"auto",width:"fit-content"}}><DeliveryIcon /></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Timely Delivery</h4>
              <p >
                When it comes to logistics, time is of the essence. SFGL has built a reputation for 
                punctuality and reliability, ensuring that your shipments arrive at their destination on 
                schedule. We understand that delays can impact your business operations, and that's why 
                we employ cutting-edge technology and proven logistical strategies to keep your 
                deliveries on track.
              </p>
           </div>
           <div>
            <div style={{marginInline:"auto",width:"fit-content"}}><LiftIcon /></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Expert Handling</h4>
              <p>
                Entrusting your cargo to SFGL means relying on a team of seasoned professionals who 
                have extensive experience in the logistics industry. Our expert team handles your goods 
                with precision and care, from packaging and warehousing to transportation and delivery. 
                With years of expertise behind us, we can ensure that even the most complex shipments 
                are managed seamlessly. 
              </p>
           </div>
       </section>
        {isVideo &&<div style={{position:"fixed",inset:"0",zIndex:"34",background:"rgb(0,0,0,0.9)",backdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <button onClick={()=> setIsVideo(false)} style={{background:"transparent",color:"#fff",border:"none",position:"absolute",top:"10px",right:"10px",fontSize:"30px"}}><CloseOutlined /></button>
           <HowItWorksVideo />
       </div>}
    </div>
  )
}

export default HomePage