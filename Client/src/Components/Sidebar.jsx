import React,{useRef} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Components.css"
import { DownOutlined } from '@ant-design/icons'
const Sidebar = ({popUp,setPopUp1,popRef}) => {
  const [show1,setShow1]= React.useState(false)
  const [show2,setShow2]= React.useState(false)
  const [show3,setShow3]= React.useState(false)
  
  const closeSidebar = () => {
    setPopUp1(false);
    window.scrollTo({top:0,behavior:"smooth"})
  };
  
  const style={width:"90%",paddingBlock:"20px",alignItems:"center",display:"flex",justifyContent:"space-between",textDecoration:"none",fontWeight:"500"}
  const style1= {position:"absolute",right:"0",zIndex:"2",border:"2px solid #A7C756",borderRadius:"10px",width:"40px",textAlign:"center",height:"25px"}
  return (
    <>
    {popUp && <aside >
        <nav ref={popRef} style={{overflow:"auto",paddingTop:"70px",animation:`${popUp ? "side-appear 0.4s linear": "side-disappear 0.4s linear"}`}} className='side_nav'>
          <div style={{display:"flex",flexDirection:"column"}}>
            <NavLink onClick={closeSidebar} to={"/"} style={style} className="side_link">Home</NavLink>
            <NavLink onClick={closeSidebar} to={"/About"} style={style} className="side_link">About <button onClick={()=> setShow1(!show1)} style={style1}><DownOutlined/> </button></NavLink>
            {show1 &&<div className='side_drop'>
               <Link >Vision</Link>
               <Link >Mission</Link>
               
            </div>}
            <NavLink onClick={closeSidebar} to={"/Services"} style={style} className="side_link">Services <button onClick={()=> setShow2(!show2)} style={style1}><DownOutlined/> </button></NavLink>
            {show2 && <div className='side_drop'>
               <Link to={"/Services/AirFreight"} >Air Freight</Link>
               <Link to={"/Services/SeaFreight"} >Sea Freight</Link>
               <Link to={"/Services/Procurement"}>Procurement</Link>
               <Link to={"/Services/Door2door"}>Door to door delivery</Link>
            </div>}
            <NavLink onClick={closeSidebar} to={"/Contact_us"} style={style} className="side_link">Contact</NavLink>
            <NavLink to={"/More"} style={style} className="side_link">More<button onClick={()=> setShow3(!show3)} style={style1}><DownOutlined/> </button></NavLink>
            {show3 && <div className='side_drop'>
               <Link to={"/FAQs"}>FAQs</Link>
               <Link to={"/Terms"}>Terms & Agreement</Link>
               
            </div>}
            </div>
        </nav>
    </aside>}
    </>
  )
}

export default Sidebar