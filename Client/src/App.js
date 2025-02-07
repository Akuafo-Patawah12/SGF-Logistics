import {useState,useEffect,useRef,Suspense,lazy} from "react"
import { Routes,Route } from "react-router-dom";
import './App.css';
import Layout from "./Layouts/Layout";
import AdminDashboard from "./Pages/AdminDashbord";
import AdminOrder from "./Pages/AdminOrder";
import Loader from "./Icons/Loader"
import Authentication from "./Components/Authentication";
import OTP from "./Components/Auth/OTP";
const Login = lazy(()=> import('./Components/Auth/Login'))
const SignUp = lazy(()=> import('./Components/Auth/SignUp'))







function App() {
const [email,setEmail] = useState("")
function getEmail(mail){
    setEmail(mail)
}
  return (
    <div className="App">
     

      <Routes>
      <Route path='/AdminDashboard' element={
                       
                          <AdminDashboard />   
                        } 
                    />
       <Route path='/AdminOrder' element={
                       
                       <AdminOrder />   
                     } 
                 />

        <Route path="/Auth"  element={<Authentication/>} />
        <Route path="/verify" element={<OTP email={email}/>} />

        <Route path='/Auth/login' element={
                    <Suspense fallback={<Loader />}>
                        <Login getEmail={getEmail}/>
                    </Suspense> }
                />

                <Route path='/Auth/sign_up' element={
                    <Suspense fallback={<Loader />}>
                        <SignUp />
                    </Suspense> }
                />
         <Route path="/*" element={<Layout />} />
      </Routes>

     

      

      

    </div>
  );
}

export default App;
