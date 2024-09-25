import React from "react";
import { useState } from "react";
import './signup.css'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({email:'',password:''})
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/userlogin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const json = await response.json()
    console.log(json);
    console.log(  JSON.stringify({email:credentials.email,password:credentials.password}))

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      Navigate("/")
      toast.success('Login successful! Welcome aboard 🎉', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      toast.error('Invalid Credentials Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }

  const handleOnChange = (event) => {
    setCredentials({...credentials,[event.target.name]: event.target.value})
  }
  return (
    <div className="auth-container">
    <form onSubmit={handleSubmit} className="auth-form">
      <h3 className="auth-header">Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control mt-2 in"
          placeholder="Enter email"
          value={credentials.email}
          onChange={handleOnChange}
          name ='email'
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control mt-2"
          placeholder="Enter password"
          value={credentials.password}
          onChange={handleOnChange}
          name= 'password'
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <Link to="/register">Register Here</Link>
      </p>
      {/* <SignInwithGoogle/> */}
    </form>
    </div>
  );
};

export default Login;
