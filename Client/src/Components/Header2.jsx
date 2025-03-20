import React,{useState} from 'react'
import { HomeOutlined,GlobalOutlined,PhoneOutlined, DownOutlined, WhatsAppOutlined, FacebookFilled, EnvironmentOutlined, MailOutlined } from '@ant-design/icons'
import { Link, NavLink } from 'react-router-dom'
import  SvgIcon  from "../Icons/svgl_svg_format_2.svg"
import  Triangle  from "../Icons/Triangle.jsx"
const Header2 = ({popDetails}) => {

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

        const Link_text={textDecoration:"none", fontSize:"16px",fontWeight:"400 !important"}
        const [activeLink, setActiveLink] = useState("");

  return (
    <div className="h_child2" >
        <Link to={"/"} className="logo" style={{height:"100%", overflow:"hidden"}}><img src={SvgIcon} alt="SVG Icon" /></Link>
    
    <nav  className="nav1" style={{transform:"translateY(10px)"}}>
         <a href="/"><span className={`header_links ${activeLink === "" ? "active" : ""}`} onClick={()=> setActiveLink("")} style={{fontSize:"16px",fontWeight:"500",}}>Home</span> </a>
         <a href="/About" style={Link_text} className={`header_links ${activeLink === "About" ? "active" : ""}`} onClick={()=> setActiveLink("About")}><span style={{fontSize:"16px",fontWeight:"500"}} >About</span> </a>
         
         <a href="/Services" style={{position:"relative",}} className={`click ${activeLink === "Services" ? "active" : ""}`} onClick={()=> setActiveLink("Services")}><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>Services  
         <div style={{ transform: "translateY(4px) rotate(180deg)" }}>
  <Triangle />
</div>
         </span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"170%",padding:"8px",isolation:"isolate",zIndex:"99"}}>
                <p><Link to={"/Services/AirFreight"} style={Link_text}>Air freight</Link></p>
                <p><Link to={"/Services/SeaFreight"} style={Link_text}>Sea freight</Link></p>
                <p><Link to={"/Services/Procurement"} style={Link_text}>Procurement</Link></p>
                <p><Link to={"/Services/Door2door"} style={Link_text}>Door to door delivery</Link></p>
                <p><Link to={"/Services/Groupage"} style={Link_text}>Groupage</Link></p>
              </div>
         </a>
         
         <a href={"/Contact"} style={Link_text} className={`header_links ${activeLink === "Contact" ? "active" : ""}`} onClick={()=> setActiveLink("Contact")}><span style={{fontSize:"16px",fontWeight:"500"}} >Contact</span> </a>
 
         <a href="/More" style={Link_text} className={`click ${activeLink === "More" ? "active" : ""}`} onClick={()=> setActiveLink("More")}><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>More  
         <div style={{ transform: "translateY(4px) rotate(180deg)" }}>
            <Triangle />
          </div>
         </span> 
              <div className="drop" style={{position:"absolute",background:"white",padding:"8px" ,width:"100px",isolation:"isolate",zIndex:"99"}}>
                <p><Link to={"/More/FAQs"} style={Link_text}>FAQs</Link></p>
                <p><Link to={"/More/pricing"} style={Link_text}>Pricing</Link></p>
                <p><Link to={"/More/Gallery"} style={Link_text}>Gallery</Link></p>
                <p><Link to={"/More/Privacy"} style={Link_text}>Privacy & Policy</Link></p>
                
         
         </div>
         </a>     
          </nav> 
     
      <div style={{width:"fit-content",marginRight:"3px",gap:"10px",display:"flex",alignItems:"center"}}>
     <Link to={"/More/Track_order"}><button  className="shipment_btn" style={{border:"none",background:"#a422d0",borderRadius:"10px",paddingInline:"10px",color:"#fff",fontSize:"16px",fontWeight:"500"}}>Track shipments</button></Link>



       <button  onClick={pop1} aria-label="Open menu" className="open">
          <div style={{rotate:`${popUp1 ? "45deg":""}`,top:`${popUp1 ? "75%":"4px"}`,left:`${popUp1 ? "35%":""}`,marginTop:"2px",width:"90%"}}></div>
          <div style={{display:`${popUp1 ? "none":"block"}`}}></div>
          <div style={{rotate:`${popUp1 ? "-45deg":""}`,top:`${popUp1 ? "15%":"23px"}`,left:`${popUp1 ? "40%":""}`,marginBottom:"8px"}}></div>
       </button>
       </div>

         {/*Toggle navigation */}
         

         
        </div>
  )
}

export default Header2