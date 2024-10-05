import React, { useState,useEffect ,useMemo} from 'react';
import {io} from "socket.io-client"

import './Auth.css'; // Import the CSS file


const SignUp = () => {


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const socket= useMemo(() =>io("http://localhost:4040/signUp",{
    transports: ['websocket'],
  }),[])
  
  useEffect(()=>{
     socket.on("connection",()=>{
       console.log("connected to the signup path")
     })
     socket.on("disconnect",(reasons)=>{
         console.log(reasons)
     })
  
     return()=>{
        socket.off("connection")
        socket.off("disconnect")
     }
  },[socket])

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation (you can expand this further)
    const validationErrors = {};
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    // If there are no validation errors, show success message
    if (Object.keys(validationErrors).length === 0) {
      socket.emit("signing_up",formData,(response)=>{
        if (response.success) {
          console.log(response.message);
        } else {
          console.log(response.message);
        }
      })
      setSuccess(true);
      
    }
    
  };

  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="form_button">Sign Up</button>
        {success && <p className="success-message">Sign-up successful!</p>}
      </form>
      </div>
    
  );
};

export default SignUp;
