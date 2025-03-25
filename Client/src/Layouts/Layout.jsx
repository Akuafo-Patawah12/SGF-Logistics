import React,{lazy,Suspense,useState,useEffect,useRef} from 'react'
import{Routes,Route,useLocation} from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'
import Header from '../Components/Header'
import Sidebar from "../Components/Sidebar"
import Footer from '../Components/Footer'
import FAQs from '../Pages/FAQs'
import Loader from '../Icons/Loader'
import TermsAndCondition from '../Pages/TermsAndCondition'

import Header2 from '../Components/Header2'
import {  CloseOutlined } from '@ant-design/icons'
import HowItWorksVideo from '../Components/HowItWorksVideo'
import PageNotFound from '../Pages/PageNotFound'
import More from "../Pages/More/More"
import PricingPage from '../Pages/Pricing'
const Privacy = lazy(()=> import('../Pages/More/Privacy')) 
const Gallery = lazy(()=> import('../Pages/More/Gallery')) 
const TrackGoods =lazy(()=> import('../Pages/TrackGoods'))
const TrackContainer = lazy(()=> import('../Pages/TrackContainer')) 
const TrackOrder= lazy(()=> import( '../Pages/TrackOrder'))
const About= lazy(()=> import ('../Pages/About'))
const SeaFreight = lazy(()=> import('../Pages/Services/SeaFreight'))
const Groupage = lazy(()=> import('../Pages/Services/Groupage'))
const Procurement = lazy(()=> import('../Pages/Services/Procurement'))
const Door2door = lazy(()=> import('../Pages/Services/Door2door'))
const ContainerClearance = lazy(()=> import('../Pages/Services/ContainerClearance'))
const ContactUs =lazy(()=> import('../Pages/ContactUs'))
const AirFreight = lazy(()=> import('../Pages/Services/AirFreight'))
const Services= lazy(()=> import('../Pages/Services/Services'))
const Mapbox = lazy(()=> import('../Pages/Mapbox'))
const MyOrders = lazy(()=> import( '../Pages/MyOrders'))
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


    
    const hideFooterOn = ["/Orders", "/More/get_a_qoute", "/MyOrders"]
   

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
        <Header2 buttonDisplay={buttonDisplay}  popDetails={[pop1,popUp1,setPopUp1]} setTrack={setTrackPop} />
        <Sidebar popUp={popUp1} setPopUp1={setPopUp1} popRef={popRef}/>
        {isVideo && <div style={{position:"fixed",inset:"0",zIndex:"99",background:"rgb(0,0,0,0.9)",backdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <button onClick={()=> setIsVideo(false)} style={{background:"transparent",color:"#fff",border:"none",position:"absolute",top:"10px",right:"10px",fontSize:"30px"}}><CloseOutlined /></button>
           <HowItWorksVideo />
       </div>}
        
        
       <HelmetProvider>
        
            <Routes>

            
                <Route path='*' element={<PageNotFound />}/> 


                <Route path='/' element={
                    <Suspense fallback={<Loader />}>
                        <HomePage  setIsVideo={setIsVideo}/>
                    </Suspense> }
                />
                

                <Route path='/More/pricing' element={
                    <Suspense fallback={<Loader />}>
                        <PricingPage/>
                    </Suspense> }
                />
                

                
                <Route path='/More' element={<More/>}/>
                <Route path='/TermsAndCondition' element={<TermsAndCondition />} />
                <Route path='/More/FAQs' element={<FAQs />}/>
                

                <Route path='/MyOrders' element={
                    <Suspense fallback={<Loader />}>
                        <MyOrders />
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

                    <Route path='/More/Map' element={
                        <Suspense fallback={<Loader />}>
                          <Mapbox />   
                        </Suspense>} 
                    />

                    <Route path='/Contact' element={
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

               <Route path='/More/Privacy' element={
                    <Suspense fallback={<Loader />}>
                        <Privacy />
                    </Suspense>} 
                />        
            
            </Routes>
            </HelmetProvider>
            
            { !hideFooterOn.includes(location.pathname) && <Footer /> }
    </div>
  )
}

export default Layout