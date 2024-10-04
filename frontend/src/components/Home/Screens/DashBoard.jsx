import React, { useEffect, useRef } from "react";
import Bg from "../../../assets/9824651.jpg";
import "../home.css";
const DashBoard = ({ menuClicked, setMenuClicked }) => {
  const ServicesRef = useRef(null);
  const gotoServices = () => {
    ServicesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuClicked(false);
  };

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
        style={{
          marginTop: "4rem",
          width: "100vw",
          height: "67vh",
          objectFit: "cover",
          objectPosition: "center top",
          boxSizing: "border-box",
        }}
      />
      <div className="container w-100">
        <div style={{ position: "absolute", top: "8rem", right: "5rem" }}>
          <div className="banner-quote">
            <h1 className="banner-head">Your Gateway to </h1>
            <h1 className="banner-head2">Pizza Paradise!</h1>
            <p className="banner-sub-head">
              {" "}
              freshly baked, hot, and just for you!
            </p>
            <button
              className="btn btn-primary banner-btn"
              onClick={gotoServices}
            >
              Order Now
            </button>
          </div>
        </div>
        <div
          className="footer"
          style={{
            height: "30vh",
          }}
        >
          <div
            id="carouselExampleInterval"
            class="carousel slide w-100"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                class="carousel-item active"
                data-bs-interval="4000"
                style={{ height: "24vh", background: "#f8f9fa" }}
              >
                <div className="row mt-2 text-center">
                  <div className="col-md-4">
                    <div className="capsule border">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrz8f66U-IU8hFujqUeqB06jbkiZ1uVHu8dQ&s"
                        alt=""
                        className="capsule-img"
                      />
                      <h4 className="foot-title">Veggies Delight</h4>
                      <p>Fresh Veggies</p>
                    </div>
                  </div>
                  <div className="col-md-4">

                  <div className="capsule border"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrz8f66U-IU8hFujqUeqB06jbkiZ1uVHu8dQ&s" alt="" className="capsule-img"/>
                      <h4  className="foot-title">Non veg</h4>
                      <p>
                      For meat Lovers
                    </p>
                      </div>


                  </div>
                  <div className="col-md-4">
                  <div className="capsule border"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrz8f66U-IU8hFujqUeqB06jbkiZ1uVHu8dQ&s" alt="" className="capsule-img"/>
                      <h4  className="foot-title">Mushroom Magic</h4>
                      <p>
                      Lorem ipsum 
                    </p>
                      </div>

                  </div>
                </div>
              </div>
              <div
                class="carousel-item"
                data-bs-interval="4000"
                style={{ height: "24vh", background: "#f8f9fa" }}
              >
                <div className="row mt-5 text-center">
                  <div className="col-md-4 d-flex">
                    <div className="d-flex flex-column">
                      <h4 className="foot-title">Customizable</h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam vitae nostrum dolorum voluptate, error
                        consectetur!
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h4 className="foot-title">Fresh</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quam exercitationem earum, harum dolor hic amet!
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h4 className="foot-title">Fast Delivery</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Fugiat tempore corporis rem.
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="carousel-item"
                data-bs-interval="4000"
                style={{ height: "24vh", background: "#f8f9fa" }}
              >
                <div className="row mt-5 text-center">
                  <div className="col-md-4 d-flex">
                    <div className="d-flex flex-column">
                      <h4 className="foot-title">Customizable</h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam vitae nostrum dolorum voluptate, error
                        consectetur!
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h4 className="foot-title">Fresh</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quam exercitationem earum, harum dolor hic amet!
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h4 className="foot-title">Fast Delivery</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Fugiat tempore corporis rem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <hr ref={ServicesRef} style={{ overflow: "auto" }} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
