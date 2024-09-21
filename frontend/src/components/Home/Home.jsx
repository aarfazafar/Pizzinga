import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import { useEffect } from "react";
import "./home.css";
import CustomCard from "../Customize/CustomCard";
import { CardELements } from "../../Store/context-store";
// const qty = [1,2,3, 4,5,6];
// const size = ['Regular', 'Large','Medium']

const Home = () => {
  const [pizzaList, setPizzaList] = useState([]);
  const [customPizza, setCustomPizza] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([]);
  // const [totalPrice, setTotalPrice] = useState([]);
  const [toCustomize, setToCustomize] = useState(false);
  const handleCustomization = (cardProps) => {
    // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
    const { name, description, price, image } = cardProps;
    // console.log(price)
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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CardELements.Provider
      value={{
        price,
        // count,
        // handleQtyChange,
        // handleSizeChange
        // calculateTotal
      }}
    >
      <div className="home-body">
        <Navbar />
        {/* <div className="banner">
        Banner
      </div> */}
        <form className=" d-flex justify-content-center">
          {" "}
          {/* justify-content-center, copy this <form> from navbar for search box */}
          {/* <button className="btn text-white bg-success" type="submit">
            Search
          </button> */}
        </form>
        <div className="menu-content">
          <div className="container">
            <div className="d-flex w-75 justify-content-between">
              <h4 className="title">Menu</h4>
              <input
                className="form-control me-2 w-50 bg-white text-dark"
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
                    return item.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .map((pizza) => {
                    return (
                      <>
                        <Card
                          key={pizza._id}
                          name={pizza.name}
                          description={pizza.description}
                          image={pizza.image_url}
                          price={pizza.price}
                          handleCustomization={handleCustomization}
                        />
                        {/* {pizzaList==[] && (
                          <h1 className="container">Oops no items</h1>
                        )} */}
                      </>
                    );
                  })}
            </div>
          </div>
          <div className="custom">
            <CustomCard
              name={customPizza.name}
              description={customPizza.description}
              image={customPizza.image}
              price={customPizza.price}
              toCustomize={toCustomize}
            />
          </div>
        </div>
        Footer
      </div>
    </CardELements.Provider>
  );
};

export default Home;
