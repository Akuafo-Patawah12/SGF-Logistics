import React,{useState} from 'react'
import { HomeOutlined,GlobalOutlined,PhoneOutlined, DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '../Icons/Logo'


const Header = ({setShowAuth,buttonDisplay}) => {
    const[popUp,setPopUp]= useState(false)
        function pop(){
        
        setPopUp(prev => !prev)
        }

        const[popNav,setPopNav]= useState(false)
  return (
    <header className="header">
        <Logo />
    
        <nav  className="nav1">
         <Link to={"/"}><span>Home</span> </Link>
         <div style={{position:"relative"}} onClick={()=>{setPopNav(prev => !prev)}}><span style={{color:"white"}}>About us</span><DownOutlined /> {popNav &&<div style={{position:"absolute",background:"white",width:"100%",padding:"8px",zIndex:"12"}}><p>Visions</p>
         <p>Mission</p>
         </div>}
         </div>
         <a ><span style={{color:"white"}}>Services</span> </a>
         <a><span style={{color:"white"}}>Contact</span> </a>
       </nav> 
     
      <div style={{marginRight:"2.5%",display:"flex",alignItems:"center",gap:"4px"}}>
      <Link to={"/Tracking"} ><button style={{border:"none",background:"#fff",height:"40px",borderRadius:"10px",paddingInline:"10px",color:"black"}}>Track</button></Link>

        {buttonDisplay && <button onClick={()=>{setShowAuth(true)}} style={{border:"none",color:" #000",height:"40px",borderRadius:"10px",paddingInline:"6px",background:"white"}}>Get started</button> }

       <button  onClick={pop} className="open">
          <div style={{rotate:`${popUp ? "45deg":""}`,top:`${popUp ? "50%":"4px"}`}}></div>
          <div style={{display:`${popUp ? "none":"block"}`}}></div>
          <div style={{rotate:`${popUp ? "-45deg":""}`,top:`${popUp ? "50%":"23px"}`}}></div>
       </button>
       </div>

         {/*Toggle navigation */}
         

         <nav style={{animation:`${popUp?"navAnimate 0.3s linear":""}`,visibility:`${popUp?"visible":"hidden"}`}} className="nav">
          <p style={{width:"95%",height:"25px",borderBottom: "1px solid #ddd",fontWeight:"700",marginLeft:"auto",marginBottom:"10px"}}>Menu</p>
          <Link to={"/"}><span>Home</span> <HomeOutlined/></Link>
          <a><span>About</span><GlobalOutlined/> </a>
          <a><span>Contact</span> <PhoneOutlined /></a>
        </nav>

      </header>
  )
}

export default Header