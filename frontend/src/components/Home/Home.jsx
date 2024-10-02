import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import { useEffect } from "react";
import "./home.css";
import CustomCard from "../Customize/CustomCard";
import DashBoard from "./Screens/DashBoard";

const Home = () => {
  const [pizzaList, setPizzaList] = useState([]);
  const [customPizza, setCustomPizza] = useState({
    name: "",
    description: "",
    image_url: "",
  });
  const [search, setSearch] = useState("");
  const [toCustomize, setToCustomize] = useState(false);
  const handleCustomization = (cardProps) => {
    setCustomPizza({ ...cardProps });
    setToCustomize(true);
  };
  const fetchData = async () => {
    let response = await fetch("http://localhost:3000/api/displaydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setPizzaList(response);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const [menuClicked, setMenuClicked] = useState(false);
  const handleScroll = (value) => {
    setMenuClicked(value);
  };
  useEffect(() => {
    const fetchPizzaData = async () => {
      await fetchData();
    };
    fetchPizzaData();
  }, []);
  return (
    <div className="home-body">
      <Navbar
        menuClicked={menuClicked}
        setMenuClicked={setMenuClicked}
        handleScroll={handleScroll}
      />
      <DashBoard menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
      <div id="menu-page" className="menu-content">
        <div className="container">
          <div className="d-flex w-75 justify-content-between">
            <h4 className="title">Menu</h4>
            <input
              className="form-control me-2 w-50 bg-white text-dark search-bar"
              type="search"
              placeholder="Type in..."
              aria-label="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="menu">
            {pizzaList &&
              pizzaList
                .filter((item) => {
                  return item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((pizza) => {
                  return (
                    <Card
                      key={pizza._id}
                      pizza={pizza}
                      handleCustomization={handleCustomization}
                    />
                  );
                })}
          </div>
        </div>
        <div className="custom">
          <CustomCard
            key={customPizza._id}
            id={customPizza._id}
            name={customPizza.name}
            description={customPizza.description}
            image={customPizza.image_url}
            price={customPizza.price}
            toCustomize={toCustomize}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
