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

        const linkStyle = {
  textDecoration: "none",
  color: "#4B0082", // indigo
  fontSize: "15px",
  fontWeight: 500,
  transition: "color 0.2s ease",
};

const hoverStyle = {
  color: "#6A0DAD", // deeper purple on hover
};


  return (
    <div className="h_child2" >
        <Link to={"/"} style={{height:"100%", overflow:"hidden",display:"flex",gap:"5px",alignItems:"center"}}><img src="./favicon.jpg" style={{width:"60px"}} alt="SVG Icon" /> <h1 style={{fontWeight:"700"}}>SFGL</h1></Link>
    
    <nav  className="nav1" >
         <a href="/"><span className={`header_links ${activeLink === "" ? "active" : ""}`} onClick={()=> setActiveLink("")} style={{fontSize:"16px",fontWeight:"500",width:"100%",}}>Home</span> </a>
         <a href="/About" style={Link_text} className={`header_links ${activeLink === "About" ? "active" : ""}`} onClick={()=> setActiveLink("About")}><span style={{fontSize:"16px",fontWeight:"500"}} >About</span> </a>
         
         <a href="/Services" style={{position:"relative",}} className={`click ${activeLink === "Services" ? "active" : ""}`} onClick={()=> setActiveLink("Services")}>
         <span style={{whiteSpace:"nowrap",fontSize:"16px",fontWeight:"500",width:"100%"}}>Services ▾ 
        
         </span> 
             <div
  className="drop"
  style={{
    position: "absolute",
    background: "white",
    width: "170%",
    padding: "12px",
    isolation: "isolate",
    zIndex: 99,
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
  }}
>
  <p style={{ margin: "8px 0" }}>
    <Link
      to="/Services/AirFreight"
      style={linkStyle}
    >
      Air Freight
    </Link>
  </p>
  <p style={{ margin: "8px 0" }}>
    <Link
      to="/Services/SeaFreight"
      style={linkStyle}
    >
      Sea Freight
    </Link>
  </p>
  <p style={{ margin: "8px 0" }}>
    <Link
      to="/Services/Procurement"
      style={linkStyle}
    >
      Procurement
    </Link>
  </p>
  <p style={{ margin: "8px 0" }}>
    <Link
      to="/Services/Door2door"
      style={linkStyle}
    >
      Door to Door Delivery
    </Link>
  </p>
  <p style={{ margin: "8px 0" }}>
    <Link
      to="/Services/Groupage"
      style={linkStyle}
    >
      Groupage
    </Link>
  </p>
</div>

         </a>
         
         <a href={"/Contact"} style={Link_text} className={`header_links ${activeLink === "Contact" ? "active" : ""}`} onClick={()=> setActiveLink("Contact")}><span style={{fontSize:"16px",fontWeight:"500",width:"100%"}} >Contact</span> </a>
 
         <a href="/More" style={Link_text} className={`click ${activeLink === "More" ? "active" : ""}`} onClick={()=> setActiveLink("More")}><span style={{whiteSpace:"nowrap",fontSize:"16px",fontWeight:"500",width:"100%"}}>More ▾  
        
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
     <Link to={"/More/Track_order"}>
       <button  
          style={{
    height: '40px',
    display: 'block',
    background: 'linear-gradient(to right, #d8b4fe, #e9d5ff, #d8b4fe)', // approx. purple-300 → purple-200 → purple-300
    border: '2px solid #c084fc', // purple-400
    color: '#222',
    borderRadius: '10px',
    paddingInline: '8px',
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  }} 
        >
         Track shipments
       </button>
      </Link>



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