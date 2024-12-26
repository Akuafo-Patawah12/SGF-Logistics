import React,{useState} from 'react'
import { HomeOutlined,GlobalOutlined,PhoneOutlined, DownOutlined, WhatsAppOutlined, FacebookFilled, EnvironmentOutlined, MailOutlined } from '@ant-design/icons'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as SvgIcon } from "../Icons/svgl_svg_format_2.svg"



const Header = ({setShowAuth,buttonDisplay,popDetails,setTrack}) => {
  const [pop1,popUp1,setPopUp1] = popDetails
    const[popUp,setPopUp]= useState(false)
        function pop(){
        
        setPopUp(prev => !prev)
        }

        const[popNav,setPopNav]= useState(false)

        

        const[popNav1,setPopNav1]= useState(false)

        const[popUp2,setPopUp2]= useState(false)
        function pop2(){
        
        setPopUp(prev => !prev)
        }

        const[popNav2,setPopNav2]= useState(false)

        const Link_text={textDecoration:"none"}
  return (
    <header className="header">
      <div className="h_child1">
          <button style={{border:"none",}}><EnvironmentOutlined /> George Bush Highway, Dzorwulu,<br/> Accra-Ghana </button>
          <button style={{border:"none"}}><PhoneOutlined /> 020 811 6360 / 053 948 0433</button>
          <button style={{border:"none"}}><MailOutlined /> sfghanalogistics24@gmail.com</button>
          
          <section style={{display:"flex" ,gap:"5px"}}>
          <button style={{height:"50px", border:"2px solid white",width:"50px", borderRadius:"5px"}}><WhatsAppOutlined /> </button>
          <button style={{height:"50px",border:"2px solid white", width:"50px", borderRadius:"5px"}}><FacebookFilled /></button>
          </section>
      </div>
      <div className="h_child2">
        <Link to={"/"} style={{transform:"translateY(10px)"}}><SvgIcon /></Link>
    
        <nav  className="nav1" style={{transform:"translateY(10px)"}}>
         <NavLink to={"/"}><span className='header_links' style={{fontSize:"16px",fontWeight:"600"}}>Home</span> </NavLink>
         <div style={{position:"relative"}} className="click" onClick={()=>{setPopNav(prev => !prev)}}><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>About  <DownOutlined /></span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"200%",padding:"8px",zIndex:"12"}}>
                <a href='#why_choose_us'><p ><Link to={"/"}>WHY CHOOSE US</Link></p></a>
                <p><Link to={"/About"}>ABOUT US</Link></p>
                
         </div>
         </div>
         <div style={{position:"relative"}} className="click"><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>Services  <DownOutlined /></span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"170%",padding:"8px",zIndex:"12"}}>
                <p><Link to={"/Services/AirFreight"} style={Link_text}>AIR FREIGHT</Link></p>
                <p><Link to={"/Services/SeaFreight"} style={Link_text}>SEA FREIGHT</Link></p>
                <p><Link to={"/Services/Procurement"} style={Link_text}>PROCUREMENT</Link></p>
                <p><Link to={"/Services/Door2door"} style={Link_text}>DOOR TO DOOR DELIVERY</Link></p>
                <p><Link to={"/Services/Groupage"} style={Link_text}>GROUPAGE</Link></p>
         </div>
         </div>
         <NavLink to={"/Contacts"} style={Link_text}><span style={{fontSize:"16px",fontWeight:"600"}} className='header_links'>Contact</span> </NavLink>
 
         <div style={{position:"relative"}} className="click"><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>More  <DownOutlined /></span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"170%",padding:"8px",zIndex:"12"}}>
                <p><Link to={"/FAQs"} style={Link_text}>FAQs</Link></p>
                <p><Link to={"/Orders"} style={Link_text}>GET A QUOTE</Link></p>
                
         </div> 
         </div>    
          </nav> 
     
      <div style={{marginRight:"3px",display:"flex",alignItems:"center",gap:"4px"}}>
     <Link to={"/Track_order"}><button  className="shipment_btn" style={{border:"none",background:"rgb(213, 35, 35)",borderRadius:"10px",paddingInline:"10px",color:"#fff",fontSize:"16px",fontWeight:"500"}}>Track shipments</button></Link>



       <button  onClick={pop1} className="open">
          <div style={{rotate:`${popUp1 ? "45deg":""}`,top:`${popUp1 ? "50%":"4px"}`}}></div>
          <div style={{display:`${popUp1 ? "none":"block"}`}}></div>
          <div style={{rotate:`${popUp1 ? "-45deg":""}`,top:`${popUp1 ? "50%":"23px"}`}}></div>
       </button>
       </div>

         {/*Toggle navigation */}
         

         <nav style={{animation:`${popUp?"navAnimate 0.3s linear":""}`,visibility:`${popUp?"visible":"hidden"}`}} className="nav">
          <p style={{width:"95%",height:"25px",borderBottom: "1px solid #ddd",fontWeight:"700",marginLeft:"auto",marginBottom:"10px"}}>Menu</p>
          <NavLink to={"/"}><span>Home</span> <HomeOutlined/></NavLink>
          <a><span>About</span><GlobalOutlined/> </a>
          <a><span>Contact</span> <PhoneOutlined /></a>
        </nav>
        </div>

      </header>
  )
}

export default Header