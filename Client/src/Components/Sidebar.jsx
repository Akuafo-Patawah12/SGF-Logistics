import React,{useRef} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Components.css"
import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import { DownOutlined } from '@ant-design/icons'
const Sidebar = ({popUp,setPopUp1,popRef}) => {
  const [show1,setShow1]= React.useState(false)
  const [show2,setShow2]= React.useState(false)
  const [show3,setShow3]= React.useState(false)
  
  const closeSidebar = () => {
    setPopUp1(false);
    window.scrollTo({top:0,behavior:"smooth"})
  };
  
  const style={width:"90%",paddingBlock:"20px",alignItems:"center",display:"flex",gap:"4px",textDecoration:"none",fontWeight:"500"}
  const style1= {position:"absolute",right:"0",zIndex:"2",border:"2px solid #A7C756",borderRadius:"10px",width:"40px",textAlign:"center",height:"25px"}
  return (
    <>
    {popUp && <aside >
        <nav ref={popRef} style={{overflow:"auto",paddingTop:"70px",animation:`${popUp ? "side-appear 0.4s linear": "side-disappear 0.4s linear"}`}} className='side_nav'>
          <div style={{display:"flex",flexDirection:"column"}}>
            <NavLink onClick={closeSidebar} to={"/"} style={style} className="side_link"><HomeOutlined />Home</NavLink>
            <NavLink onClick={closeSidebar} to={"/About"} style={style} className="side_link"><InfoCircleOutlined/>About <button onClick={()=> setShow1(!show1)} style={style1}><DownOutlined/> </button></NavLink>
            {show1 &&<div className='side_drop'>
               <Link >Vision</Link>
               <Link >Mission</Link>

               
 
  
               
            </div>}
            <NavLink onClick={closeSidebar} to={"/Services"} style={style} className="side_link"><AppstoreOutlined />Services <button onClick={()=> setShow2(!show2)} style={style1}><DownOutlined/> </button></NavLink>
            {show2 && <div className='side_drop'>
               <Link to={"/Services/AirFreight"} >Air Freight</Link>
               <Link to={"/Services/SeaFreight"} >Sea Freight</Link>
               <Link to={"/Services/Procurement"}>Procurement</Link>
               <Link to={"/Services/Door2door"}>Door to door delivery</Link>
            </div>}
            <NavLink onClick={closeSidebar} to={"/Contact_us"} style={style} className="side_link"><PhoneOutlined style={{transform:"rotate(90deg)"}}/>Contact</NavLink>
            <NavLink to={"/More"} style={style} className="side_link"><MoreOutlined />More<button onClick={()=> setShow3(!show3)} style={style1}><DownOutlined/> </button></NavLink>
            {show3 && <div className='side_drop'>
               <Link to={"/More/FAQs"} onClick={closeSidebar}>FAQs</Link>
               <Link to={"/More/Gallery"} onClick={closeSidebar}>Galery</Link>
               <Link to={"/More/Privacy"} onClick={closeSidebar}>Privacy & Policy</Link>
               
            </div>}
            </div>
            <div style={{color:"#333",position:"absolute",bottom:"0",borderTop:"1px solid #ccc",width:"85%",fontSize:"14px",paddingBlock:"10px"}}>© 2024 SF Ghana Logistics.</div>
        </nav>


        
    </aside>}


    </>
  )
}

export default Sidebar