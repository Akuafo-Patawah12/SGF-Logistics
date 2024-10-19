import React,{lazy,Suspense,useState,useEffect,useRef} from 'react'
import{Routes,Route,useLocation} from "react-router-dom"
import Header from '../Components/Header'
import Sidebar from "../Components/Sidebar"
import Footer from '../Components/Footer'
import FAQs from '../Pages/FAQs'
import Loader from '../Icons/Loader'
import TermsAndCondition from '../Pages/TermsAndCondition'
import Tracking from '../Components/Tracking'
const ContactUs =lazy(()=> import('../Pages/ContactUs'))
const Services= lazy(()=> import('../Pages/Services'))
const AdminDashboard = lazy(()=> import('../Pages/AdminDashbord'))
const Orders = lazy(()=> import( '../Pages/Orders'))
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


    const[showAuth,setShowAuth] = useState(false)


    const[popUp1,setPopUp1]= useState(false)
        function pop1(){
        
        setPopUp1(prev => !prev)
        }

        const popRef= useRef(null)
        useEffect(()=>{   //this function allows u to close the popup menu by clicking outside of it.
          let closePop =(event)=>{
            if(popRef.current && !popRef.current.contains(event.target)){
              setPopUp1(false);
            }
               /**This function is executed when you click outside the pop up menu in event.js to close it */
          }
          document.addEventListener("mousedown",closePop);
          return()=>{
            document.removeEventListener("mousedown",closePop)
            /**This function is executed when you click outside the sidebar to close it in ToggleSideBar.jsx */
          }
        },[]); 


        const [trackPop,setTrackPop] =useState(false)
  return (
    <div>

        <Header buttonDisplay={buttonDisplay} setShowAuth={setShowAuth} popDetails={[pop1,popUp1,setPopUp1]} setTrack={setTrackPop}/>
        <Sidebar popUp={popUp1} popRef={popRef}/>
        <Tracking  track_comp={[trackPop,setTrackPop]}/>
            <Routes>
                <Route path='/'  element={
                    <Suspense fallback={<Loader />}>
                        <HomePage setShowAuth={setShowAuth} showAuth={showAuth} />
                    </Suspense> }
                /> 
                <Route path='/TermsAndCondition' element={<TermsAndCondition />} />
                <Route path='/FAQs' element={<FAQs />}/>
                <Route path='/Orders' element={
                    <Suspense fallback={<Loader />}>
                        <Orders />
                    </Suspense>} 
                />
                    

                    <Route path='/AdminDashboard' element={
                        <Suspense fallback={<Loader />}>
                          <AdminDashboard />   
                        </Suspense>} 
                    />

                    <Route path='/Services' element={
                        <Suspense fallback={<Loader />}>
                          <Services />   
                        </Suspense>} 
                    />

                    <Route path='/Contact_Us' element={
                        <Suspense fallback={<Loader />}>
                          <ContactUs />   
                        </Suspense>} 
                    />
            
            </Routes>
            
       <Footer />
    </div>
  )
}

export default Layout