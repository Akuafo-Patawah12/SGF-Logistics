import React,{useState} from 'react'
import { DoubleRightOutlined, RightOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom';

const Accordion = (props) => {
  const style={color:"white",fontSize:"16px",fontWeight:"600"}
    const [Accordion,setAccordion] = useState(false);
const showAccordion=()=>{
    setAccordion(prev=> !prev)
}
  return (
    <div style={{minHeight:`${Accordion ? "110px":"40px"}`}}>
    <button onClick={showAccordion} style={{height:"40px",lineHeight:"2rem"}}><span style={{fontSize:"18px"}}>{props.header}</span><span style={{color:"white", rotate:`${Accordion ? "90deg":"0deg"}`}}><RightOutlined/></span></button>
    <div  className="accordion">
     <span style={style}><DoubleRightOutlined /> <Link to={props.link}>{props.span1}</Link></span>  <br/>
     <span style={style}><DoubleRightOutlined />  <Link to={props.span2}>{props.span2}</Link></span>  <br/>
     <span style={style}><DoubleRightOutlined />  <Link to={props.span3}>{props.span3}</Link></span>
    </div> 
  </div>
  )
}

export default Accordion