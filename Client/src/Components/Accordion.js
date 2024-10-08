import React,{useState} from 'react'
import { RightOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom';

const Accordion = (props) => {
    const [Accordion,setAccordion] = useState(false);
const showAccordion=()=>{
    setAccordion(prev=> !prev)
}
  return (
    <div style={{minHeight:`${Accordion ? "100px":"30px"}`}}>
    <button onClick={showAccordion}><span>{props.header}</span><span style={{color:"white", rotate:`${Accordion ? "90deg":"0deg"}`}}><RightOutlined/></span></button>
    <div  className="accordion">
     <span style={{color:"white"}}><Link to={props.link}>{props.span1}</Link></span>  <br/>
     <span style={{color:"white"}}><Link to={props.span2}>{props.span2}</Link></span>  <br/>
     <span style={{color:"white"}}><Link to={props.span3}>{props.span3}</Link></span>
    </div> 
  </div>
  )
}

export default Accordion