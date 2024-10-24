import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Components.css"
import { DownOutlined } from '@ant-design/icons'
const Sidebar = ({popUp,popRef}) => {
  const style={width:"90%",alignItems:"center",display:"flex",justifyContent:"space-between",textDecoration:"none",fontWeight:"500"}
  const style1= {border:"2px solid #A7C756",borderRadius:"10px",width:"40px",textAlign:"center",height:"25px"}
  return (
    <>
    {popUp && <aside >
        <nav ref={popRef} style={{paddingTop:"70px",animation:`${popUp ? "side-appear 0.4s linear": "side-disappear 0.4s linear"}`}} className='side_nav'>
            <NavLink to={"/"} style={style} className="side_link">Home</NavLink>
            <NavLink to={"/About"} style={style} className="side_link">About <button style={style1}><DownOutlined/> </button></NavLink>
            <NavLink to={"/Services"} style={style} className="side_link">Services <button style={style1}><DownOutlined/> </button></NavLink>
            <NavLink to={"/Contact"} style={style} className="side_link">Contact</NavLink>
            <NavLink to={"/More"} style={style} className="side_link">More<button style={style1}><DownOutlined/> </button></NavLink>
        </nav>
    </aside>}
    </>
  )
}

export default Sidebar