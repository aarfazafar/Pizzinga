import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Screenshot_2024-09-16_181805-removebg-preview.png";
import "./navbar.css";
const Navigator = () => {
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
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse w-100 d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Menu
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
      </nav>
    </>
  );
};

export default Navigator;
