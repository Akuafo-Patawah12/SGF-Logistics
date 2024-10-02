import React,{useState} from 'react'
import { HomeOutlined,GlobalOutlined,PhoneOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


const Header = ({setShowAuth}) => {
    const[popUp,setPopUp]= useState(false)
        function pop(){
        
        setPopUp(prev => !prev)
        }
  return (
    <header className="header">
        <h3 style={{marginLeft:"5%"}}>Logistic</h3>
        
      
  
      <div style={{marginRight:"5%",display:"flex",alignItems:"center",gap:"4px"}}>

        <button onClick={()=>{setShowAuth(true)}} style={{border:"2px solid #aaa",height:"40px",borderRadius:"10px",background:"inherit"}}>Get started</button>

       <button  onClick={pop} className="open">
          <div style={{rotate:`${popUp ? "45deg":""}`,top:`${popUp ? "50%":"4px"}`}}></div>
          <div style={{display:`${popUp ? "none":"block"}`}}></div>
          <div style={{rotate:`${popUp ? "-45deg":""}`,top:`${popUp ? "50%":"23px"}`}}></div>
       </button>
       </div>

         {/*Toggle navigation */}

         <nav style={{animation:`${popUp?"navAnimate 0.3s linear":""}`,visibility:`${popUp?"visible":"hidden"}`}} className="nav">
          <Link to={"/"}><span>Home</span> <HomeOutlined/></Link>
          <a><span>About</span><GlobalOutlined/> </a>
          <a><span>Contact</span> <PhoneOutlined /></a>
        </nav>

      </header>
  )
}

export default Header