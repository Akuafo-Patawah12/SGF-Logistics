import React,{useState} from 'react'
import { DoubleRightOutlined, RightOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom';

const Accordion = (props) => {
  const style={color:"white",fontSize:"16px",fontWeight:"500"}
    const [Accordion,setAccordion] = useState(false);
const showAccordion=()=>{
    setAccordion(prev=> !prev)
}
  return (
    <div style={{minHeight:`${Accordion ? "130px":"40px"}`,paddingBottom:"10px"}}>
    <button onClick={showAccordion} style={{height:"40px",lineHeight:"1.5rem",width:"97%",marginInline:"auto",border:"none",background:"transparent",color:"#eee",display:"flex",justifyContent:"space-between",marginTop:"6px"}}><span style={{fontSize:"18px"}}>{props.header}</span><div style={{color:"white",width:"fit-content",transform:`${Accordion ? "translateX(-10px)" : ""}`,rotate:`${Accordion ? "90deg":"0deg"}`}}><RightOutlined/></div></button>
    <div  className="accordion">
     <span style={style}><DoubleRightOutlined size={10} /> <Link to={props.link}>{props.span1}</Link></span>  <br/>
     <span style={style}><DoubleRightOutlined style={{fontSize:"14px"}}/>  <Link to={`/${props.span2}`}>{props.span2}</Link></span>  <br/>
     <span style={style}><DoubleRightOutlined style={{fontSize:"14px"}}/>  <Link to={`/${props.span3}`}>{props.span3}</Link></span>
    </div> 
  </div>
  )
}

export default Accordion