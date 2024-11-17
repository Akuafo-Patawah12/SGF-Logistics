import {useState,useEffect,useRef} from "react"
import { Routes,Route } from "react-router-dom";
import './App.css';
import Layout from "./Layouts/Layout";
import AdminDashboard from "./Pages/AdminDashbord";

import Authentication from "./Components/Authentication";





function App() {


  return (
    <div className="App">
     

      <Routes>
      <Route path='/AdminDashboard' element={
                       
                          <AdminDashboard />   
                        } 
                    />
        <Route path="/Auth"  element={<Authentication/>} />
         <Route path="/*" element={<Layout />} />
      </Routes>

     

      

      

    </div>
  );
}

export default App;
