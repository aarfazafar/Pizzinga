import React, { useEffect, useRef } from "react";
import Bg from "../../../assets/9824651.jpg";
import "../home.css";
const DashBoard = ({menuClicked, setMenuClicked}) => {
  const ServicesRef = useRef(null);
    const gotoServices = () => {
    ServicesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuClicked(false)
    }

    useEffect(() => {
      if (menuClicked) {
        gotoServices(); 
      }
    }, [menuClicked]);
  return (
    <div className="banner-container p-0 m-0">
      <img
        src={Bg}
        alt=""
        style={{marginTop:'4rem',
          width: "100vw",
          height: "67vh",
          objectFit: "cover",
          objectPosition: "center top",
          boxSizing: "border-box",
        }}
      />
      <div className="container w-100">
        <div style={{ position: "absolute", top: "8rem", right: "5rem" }}>
          <div className='banner-quote'>
            <h1 className="banner-head">Your Gateway to </h1>
            <h1 className="banner-head2">Pizza Paradise!</h1>
            <p className="banner-sub-head"> freshly baked, hot, and just for you!</p>
            <button className="btn btn-primary banner-btn" onClick={gotoServices}>Order Now</button>
          </div>
        </div>

        <div className="row mt-5 text-center"  >
          <div className="col-md-4 d-flex">
            <div className="d-flex flex-column">
            <h4 className='foot-title'>Customizable</h4>
            <p ref={ServicesRef}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              saepe adipisci! Nesciunt.
            </p>
            </div>
          </div>
          <div className="col-md-4">
            <h4 className='foot-title'>Fresh</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              saepe adipisci! Nesciunt.
            </p>
          </div>
          <div className="col-md-4">
            <h4 className='foot-title'>Fast Delivery</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              saepe adipisci! Nesciunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
