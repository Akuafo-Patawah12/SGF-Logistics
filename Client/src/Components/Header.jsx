import React,{useState} from 'react'
import { HomeOutlined,GlobalOutlined,PhoneOutlined, DownOutlined, WhatsAppOutlined, FacebookFilled, EnvironmentOutlined, MailOutlined } from '@ant-design/icons'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as SvgIcon } from "../Icons/svgl_svg_format_2.svg"



const Header = () => {
 
  return (
    <header className="header">
      <div className="h_child1">
          <button style={{border:"none",}}><EnvironmentOutlined /> George Bush Highway, Dzorwulu,<br/> Accra-Ghana </button>
          <button style={{border:"none"}}><PhoneOutlined style={{rotate:"90deg"}}/> 020 811 6360 / 053 948 0433</button>
          <button style={{border:"none"}}><MailOutlined /> sfghanalogistics24@gmail.com</button>
          
          <section style={{display:"flex" ,gap:"5px"}}>
          <button style={{height:"50px", border:"2px solid white",width:"50px", borderRadius:"5px"}}><WhatsAppOutlined /> </button>
          <button style={{height:"50px",border:"2px solid white", width:"50px", borderRadius:"5px"}}><FacebookFilled /></button>
          </section>
      </div>
      
        

      </header>
  )
}

export default Header