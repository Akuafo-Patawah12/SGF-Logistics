import React,{useState,useRef,useEffect} from 'react'
import "./Home.css"
import Authentication from "../Components/Authentication"
import { LeftCircleFilled,RightCircleFilled } from '@ant-design/icons'
const HomePage = ({setShowAuth,showAuth}) => {
    const[text,setText]= useState("Open")



function changeText(){
  setText("David")
}


  const parentRef = useRef(null);

  const childRef1 = useRef(null);
  const childRef2 = useRef(null);
  const childRef3 = useRef(null);
  const childRef4 = useRef(null);

  const [index,setIndex]= useState(0)

  const scrollToLeft = (n) => {

    setIndex(n)
  };


  const [disable,setDisable]= useState(false)
  useEffect(()=>{
    
    const auto_slider=setInterval(()=>{
      setIndex(prev => prev + 1)
    },5000)

    const parent= parentRef.current
    const child= [
      childRef1.current,
      childRef2.current,
      childRef3.current,
      childRef4.current,
      ""
    ]
     
    if(index===0){
      setDisable(true)
    }else{
      setDisable(false)
    }
    index >= child.length-1 ? setIndex(0): setIndex(index);
    
    const childLeft = child[index].offsetLeft;
    parent.scrollTo({
      left: childLeft,
      behavior: "smooth" // Add smooth scrolling
    });

    return()=>{
       clearInterval(auto_slider)
    }
  },[index])

  function setindex(char){
    
  
    if(char==="+"){
        setIndex(prev=> prev + 1)
    }else{
      setIndex(prev=> prev - 1);
    }
    
  }



  




  return (
    
    <div>
        {showAuth&& <Authentication  authShow={[showAuth,setShowAuth]}/>}
      <div
        ref={parentRef}
        className="slide-show"
        style={{
          width: "90%",
          height: "300px",
          
          whiteSpace: "nowrap",
          border: "1px solid black"
        }}
      >
        
          <div ref={childRef1} style={{background:"purple"}}>Item 1</div>
          <div ref={childRef2} style={{background:"blue"}}>Item 2</div>
          <div ref={childRef3} style={{background:"yellow"}}>Item 3</div>
          <div ref={childRef4} style={{background:"orange"}}>Item 4</div>

          <section className="slider">
             <button disabled={disable} style={{visibility:`${disable ? "hidden":"visible"}`}} onClick={()=> setindex('-')}><LeftCircleFilled/></button>
             <button onClick={()=> setindex('+')}><RightCircleFilled/> </button>
          </section>

          <section className="slide_btn">
            <button onClick={()=> scrollToLeft(0)}>  </button>
            <button onClick={()=> scrollToLeft(1)}>  </button>
            <button onClick={()=> scrollToLeft(2)}>  </button>
            <button onClick={()=> scrollToLeft(3)}>  </button>
      </section>
        
      </div>
    </div>
  )
}

export default HomePage