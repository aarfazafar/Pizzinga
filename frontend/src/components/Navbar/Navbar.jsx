import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Screenshot_2024-09-16_181805-removebg-preview.png";
import './navbar.css'
const Navbar = () => {
  const handleLoginClick = (e) => {
    e.preventDefault()
     window.location.href = "/login"
  }
  const handleSignupClick = (e) => {
    e.preventDefault()
     window.location.href = "/register"
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex" to="/">
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="34"
              className="d-inline-block align-text-top"
            />
            <h3 className="d-inline logo fst-italic ms-1">Pizzinga</h3>
          </Link>
        </div>   
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="container-fluid">
          <div className="collapse navbar-collapse w-100 d-flex justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Contact Us
                </Link>
              </li>
            </ul>

          </div>
          </div>
          <div className="container-fluid">
            <div className="w-100 d-flex justify-content-end gap-3">
              <button type="button" className="btn btn-outline-primary p-2" onClick={handleLoginClick}>
                Login
              </button>
              <button type="button" className="btn btn-primary p-2" onClick={handleSignupClick}>
                Sign Up
              </button>
            </div>
          </div>
      </nav>
    </>
  );
};

export default Navbar;
