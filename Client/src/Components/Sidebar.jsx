import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Components.css"
import { DownOutlined } from '@ant-design/icons'
const Sidebar = ({popUp,popRef}) => {
  const style={width:"90%",alignItems:"center",display:"flex",justifyContent:"space-between",textDecoration:"none"}
  const style1= {border:"2px solid #A7C756",borderRadius:"10px",width:"40px",textAlign:"center",height:"25px"}
  return (
    <>
    {popUp && <aside >
        <nav ref={popRef} style={{paddingTop:"70px",animation:`${popUp ? "side-appear 0.4s linear": "side-disappear 0.4s linear"}`}} className='side_nav'>
            <NavLink to={"/"} style={style}><button style={{fontWeight:"600",color:"#444"}}>Home</button></NavLink>
            <NavLink to={"/About"} style={style}><button style={{fontWeight:"600",color:"#444"}}>About</button> <button style={style1}><DownOutlined/> </button></NavLink>
            <NavLink to={"/Services"} style={style}><button style={{fontWeight:"600",color:"#444"}}>Services</button><button style={style1}><DownOutlined/> </button></NavLink>
            <NavLink to={"/Contact"} style={style}><button style={{fontWeight:"600",color:"#444"}}>Contact</button></NavLink>
            <NavLink to={"/More"} style={style}><button style={{fontWeight:"600",color:"#444"}}>More</button><button style={style1}><DownOutlined/> </button></NavLink>
        </nav>
    </aside>}
    </>
  )
}

export default Sidebar