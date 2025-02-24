import {useState,useEffect,useRef,Suspense,lazy} from "react"
import { Routes,Route } from "react-router-dom";
import './App.css';
import Layout from "./Layouts/Layout";
import AdminDashboard from "./Pages/AdminDashbord";
import AdminOrder from "./Pages/AdminOrder";
import Loader from "./Icons/Loader"

import OTP from "./Components/Auth/OTP";
import UsersList from "./Pages/UserList"
import ContainerPage from "./Pages/ContainerPage"
import ResetPassword from "./Components/Auth/ResetPassword";
const Login = lazy(()=> import('./Components/Auth/Login'))
const SignUp = lazy(()=> import('./Components/Auth/SignUp'))
const ForgetPassword= lazy(()=> import('./Components/Auth/ForgetPassword'))







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

<Route path='/Containers' element={
                       
                       <ContainerPage />   
                     } 
                 />

<Route path='/users' element={
                       
                       <UsersList />   
                     } 
                 />

        
        <Route path="/verify" element={<OTP mail={email}/>} />

        <Route path='/Auth/login' element={
                    <Suspense fallback={<Loader />}>
                        <Login getEmail={getEmail}/>
                    </Suspense> }
                />

<Route path='/Auth/forget_password' element={
                    <Suspense fallback={<Loader />}>
                       <ForgetPassword /> 
                    </Suspense> }
                />
                <Route path="/Auth/reset_password/:token" element={<ResetPassword />} />

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
