import React,{lazy,Suspense,useState,useEffect,useRef} from 'react'
import{Routes,Route,useLocation} from "react-router-dom"
import Header from '../Components/Header'
import Sidebar from "../Components/Sidebar"
import Footer from '../Components/Footer'
import FAQs from '../Pages/FAQs'
import Loader from '../Icons/Loader'
import TermsAndCondition from '../Pages/TermsAndCondition'
import Tracking from '../Components/Tracking'
import LoginPrompt from '../Components/LoginPrompt'
import Header2 from '../Components/Header2'
import {  CloseOutlined, PlayCircleFilled,RightCircleFilled, StarFilled } from '@ant-design/icons'
import HowItWorksVideo from '../Pages/Components/HowItWorksVideo'
const Gallery = lazy(()=> import('../Pages/Gallery')) 
const TrackGoods =lazy(()=> import('../Pages/TrackGoods'))
const TrackContainer = lazy(()=> import('../Pages/TrackContainer')) 
const Invoice = lazy(()=> import( '../Pages/Invoice'))
const TrackOrder= lazy(()=> import( '../Pages/TrackOrder'))
const About= lazy(()=> import ('../Pages/About'))
const SeaFreight = lazy(()=> import('../Pages/Sub_Pages/SeaFreight'))
const Groupage = lazy(()=> import('../Pages/Sub_Pages/Groupage'))
const Procurement = lazy(()=> import('../Pages/Sub_Pages/Procurement'))
const Door2door = lazy(()=> import('../Pages/Sub_Pages/Door2door'))
const ContainerClearance = lazy(()=> import('../Pages/Sub_Pages/ContainerClearance'))
const ContactUs =lazy(()=> import('../Pages/ContactUs'))
const AirFreight = lazy(()=> import('../Pages/Sub_Pages/AirFreight'))
const Services= lazy(()=> import('../Pages/Services'))
const AdminDashboard = lazy(()=> import('../Pages/AdminDashbord'))
const Orders = lazy(()=> import( '../Pages/Orders'))
const Mapbox = lazy(()=> import('../Pages/Mapbox'))
const AllOrders = lazy(()=> import( '../Pages/AllOrders'))
const HomePage= lazy(()=>import('../Pages/HomePage'))

const Layout = () => {

    const location= useLocation()
    const [path,setPath] = useState("/")
    const [buttonDisplay,setButtonDisplay] = useState(true)
    
    useEffect(()=>{
          if(location.pathname===path){
              setButtonDisplay(true)
              return 
          }
          setButtonDisplay(false)
    },[location.pathname,path])


    const [isFooter,setIsFooter]= useState(true)
    useEffect(()=>{
      if(location.pathname==="/Orders" || location.pathname==="/Track_order" ||  location.pathname==="/AllOrders"){
        setIsFooter(false)
          return 
      }
      setIsFooter(true)
},[location.pathname])


    const[showAuth,setShowAuth] = useState(false)


    const[popUp1,setPopUp1]= useState(false)
        function pop1(){
        
        setPopUp1(prev => !prev)
        }

        const popRef= useRef(null)
        const trackRef= useRef(null)
        const[trackPop,setTrackPop]= useState(false)
        useEffect(()=>{   //this function allows u to close the popup menu by clicking outside of it.
          let closePop =(event)=>{
            if(popRef.current && !popRef.current.contains(event.target)){
              setPopUp1(false);
            }

            if(trackRef.current && !trackRef.current.contains(event.target)){
              setTrackPop(false);
            }
               /**This function is executed when you click outside the pop up menu in event.js to close it */
          }
          document.addEventListener("mousedown",closePop);
          return()=>{
            document.removeEventListener("mousedown",closePop)
            /**This function is executed when you click outside the sidebar to close it in ToggleSideBar.jsx */
          }
        },[]); 


     
 const [isPrompt,setPrompt] = useState(false)

 const [isVideo,setIsVideo] = useState(false)
        
  return (
    <div>

        <Header />
        <Header2 buttonDisplay={buttonDisplay} setShowAuth={setShowAuth} popDetails={[pop1,popUp1,setPopUp1]} setTrack={setTrackPop} />
        <Sidebar popUp={popUp1} setPopUp1={setPopUp1} popRef={popRef}/>
        {isVideo && <div style={{position:"fixed",inset:"0",zIndex:"99",background:"rgb(0,0,0,0.9)",backdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <button onClick={()=> setIsVideo(false)} style={{background:"transparent",color:"#fff",border:"none",position:"absolute",top:"10px",right:"10px",fontSize:"30px"}}><CloseOutlined /></button>
           <HowItWorksVideo />
       </div>}
        
        <LoginPrompt prompt={[isPrompt,setPrompt]}/>
      
        <Tracking track_comp={[trackPop,setTrackPop]} trackRef={trackRef}/>
            <Routes>
                <Route path='/' element={
                    <Suspense fallback={<Loader />}>
                        <HomePage setShowAuth={setShowAuth} showAuth={showAuth} setIsVideo={setIsVideo}/>
                    </Suspense> }
                /> 
                <Route path='/TermsAndCondition' element={<TermsAndCondition />} />
                <Route path='/More/FAQs' element={<FAQs />}/>
                <Route path='/Orders' element={
                    <Suspense fallback={<Loader />}>
                        <Orders />
                    </Suspense>} 
                />

                <Route path='/AllOrders' element={
                    <Suspense fallback={<Loader />}>
                        <AllOrders />
                    </Suspense>} 
                />

            <Route path='/More/Track_order/Container' element={
                    <Suspense fallback={<Loader />}>
                        <TrackContainer />
                    </Suspense>} 
                />

               <Route path='/More/Track_order/Goods' element={
                    <Suspense fallback={<Loader />}>
                        <TrackGoods />
                    </Suspense>} 
                />


                    

                    

                    <Route path='/Services' element={
                        <Suspense fallback={<Loader />}>
                          <Services />   
                        </Suspense>} 
                    />

                 <Route path='/Invoice' element={
                        <Suspense fallback={<Loader />}>
                          <Invoice />   
                        </Suspense>} 
                    />

                    <Route path='/About' element={
                        <Suspense fallback={<Loader />}>
                          <About />   
                        </Suspense>} 
                    />

<Route path='/More/Gallery' element={
                        <Suspense fallback={<Loader />}>
                          <Gallery />   
                        </Suspense>} 
                    />

                    <Route path='/More/Track_order' element={
                        <Suspense fallback={<Loader />}>
                          <TrackOrder setPrompt={setPrompt} setTrackPop={setTrackPop}/>   
                        </Suspense>} 
                    />

                    <Route path='/Map/:id' element={
                        <Suspense fallback={<Loader />}>
                          <Mapbox />   
                        </Suspense>} 
                    />

                    <Route path='/Contact_us' element={
                        <Suspense fallback={<Loader />}>
                          <ContactUs />   
                        </Suspense>} 
                    />

                   <Route path='/Services/Groupage' element={
                        <Suspense fallback={<Loader />}>
                          <Groupage />   
                        </Suspense>} 
                    />

                    <Route path='/Services/SeaFreight' element={
                        <Suspense fallback={<Loader />}>
                          <SeaFreight />   
                        </Suspense>} 
                    />

                    <Route path='/Services/AirFreight' element={
                        <Suspense fallback={<Loader />}>
                          <AirFreight />   
                        </Suspense>} 
                    /> 

                    <Route path='/Services/Procurement' element={
                        <Suspense fallback={<Loader />}>
                          <Procurement />   
                        </Suspense>} 
                    /> 

                    <Route path='/Services/Door2door' element={
                        <Suspense fallback={<Loader />}>
                          <Door2door />   
                        </Suspense>} 
                    />   

                    <Route path='/Services/Clearance' element={
                    <Suspense fallback={<Loader />}>
                        <ContainerClearance />
                    </Suspense>} 
                />          
            
            </Routes>
            
       {isFooter &&<Footer />} 
    </div>
  )
}

export default Layout