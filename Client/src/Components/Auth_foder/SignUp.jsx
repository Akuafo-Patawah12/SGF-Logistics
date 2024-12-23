import React, { useState,useEffect ,useMemo} from 'react';

import './Auth.css'; // Import the CSS file


const SignUp = () => {


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    account_type:"User",
    confirmPassword: ''
  });


 

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
     
     

      
      const validationErrors = {};
    // Validation (you can expand this further)
    
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors); // Return all validation errors
    }


    const response = await fetch("https://sgf-logistics-1.onrender.com/sign_up", {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({formData}), // example payload
    });

    const data = await response.json();

    if(response.status===403) validationErrors.email="Email already exist"
    

    // If there are no validation errors, show success message
    if (Object.keys(validationErrors).length === 0) {
      if(data.message==="Signed up successful")
      setSuccess(true);
      
      
    }

  }catch(error){
     
    console.log(error)
  }
    
  };

  return (
    
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
          {errors.confirmPassword && <span className="error">{errors?.confirmPassword}</span>}
        </div>

        <button type="submit" className="form_button">Sign Up</button>
        {success && <p className="success-message">Sign-up successful!</p>}
      </form>
     
    
  );
};

export default SignUp;
