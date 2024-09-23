import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./customcard.css";
import SelectOptions from "./SelectOptions";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useCart } from "../../Store/context-store";
const CustomCard = ({
  id,
  name = "pizza",
  description,
  image,
  price,
  toCustomize,
}) => {
  const pizzaBase = [
    {
      name: "Normal",
      value: 0,
    },
    {
      name: "New Hand Tossed",
      value: 0.1,
    },
    {
      name: "Whole Wheat Base",
      value: 0.11,
    },
    {
      name: "Gluten-Free Base",
      value: 0.12,
    },
    {
      name: "Pan Pizza",
      value: 0.11,
    },
    {
      name: "Cheese Burst",
      value: 0.13,
    },
  ];
  const cheese = [
    {
      name: "Mozzarella",
      value: 0.1,
    },
    {
      name: "Cheddar",
      value: 0.11,
    },
    {
      name: "Parmesan",
      value: 0.12,
    },
    {
      name: "Gorgonzola",
      value: 0.11,
    },
    {
      name: "Provolone",
      value: 0.13,
    },
  ];
  const sauce = [
    {
      name: "Classic Marinara Sauce",
      value: 0.1,
    },
    {
      name: "Alfredo Sauce",
      value: 0.11,
    },
    {
      name: "Pesto Sauce",
      value: 0.12,
    },
    {
      name: "Barbecue Sauce",
      value: 0.12,
    },
    {
      name: "Garlic Parmesan Sauce",
      value: 0.13,
    },
  ];
  const toppings = [
    {
      name: "Bell Peppers (Capsicum)",
      value: "0.13",
    },
    {
      name: "Onions",
      value: "0.11",
    },
    {
      name: "Mushrooms",
      value: "0.14",
    },
    {
      name: "Jalapeños",
      value: "0.11",
    },
    {
      name: "Sweet Corn",
      value: "0.13",
    },
    {
      name: "Pepperoni",
      value: "0.15",
    },
    {
      name: "Tomatoes",
      value: "0.1",
    },
  ];

  const [count, setCount] = useState(1);
  const [size, setSize] = useState("regular");
  const [isMounted, setIsMounted] = useState(false);
  const [baseChosen, setBaseChosen] = useState({ name: "", cost: 0 });
  const [cheeseChosen, setCheeseChosen] = useState({ name: "", cost: 0 });
  const [sauceChosen, setSauceChosen] = useState({ name: "", cost: 0 });
  const [toppingChosen, setToppingChosen] = useState({ name: "", cost: 0 });
  const [ingredients, setIngredients] = useState({
    baseChosen: "",
    cheeseChosen: "",
    sauceChosen: "",
    toppingChosen: "",
  });
  const [addedToCart, setAddedTocart] = useState(false);
  // let totalPrice =  Math.ceil((price[`${size}`]*30)*count);

  const calculateTotal = () => {
    return Math.ceil(
      (price[`${size}`] * 30 +
        (baseChosen.cost +
          cheeseChosen.cost +
          sauceChosen.cost +
          toppingChosen.cost)) *
        count
    );
  };
  const addIngredients = (item, type, ingredientCost) => {
    console.log(type);
    console.log(item);
    if (type === "1") {
      setBaseChosen({ name: item.name, cost: ingredientCost });
    } else if (type === "2") {
      setCheeseChosen({ name: item.name, cost: ingredientCost });
    } else if (type === "3") {
      setSauceChosen({ name: item.name, cost: ingredientCost });
    } else if (type === "4") {
      setToppingChosen({ name: item.name, cost: ingredientCost });
    }
  };
  const handleQtyChange = (event) => {
    console.log(event.target.value);
    setCount(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  let dispatch = useDispatch();
  let data = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await dispatch({
      type: "ADD",
      id,
      name,
      image,
      price: calculateTotal(),
      count,
      size,
      ingredients: ingredients,
    });
    setAddedTocart(true);
  };
  
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    calculateTotal();
  }, [count, size]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    setIngredients({
      baseChosen: baseChosen,
      cheeseChosen: cheeseChosen,
      sauceChosen: sauceChosen,
      toppingChosen: toppingChosen,
    });
  }, [baseChosen, cheeseChosen, sauceChosen, toppingChosen]);
  return (
    <div className="card custom-pizza" style={{ width: "24rem" }}>
      {toCustomize ? (
        <>
          <h5 className="custom-title">Customize your Pizza</h5>
          <img src={image} className="custom-image" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text card-title">{description}</p>

            <div className="d-flex-col justify-content-center align-items-center">
              <div className="selection d-flex gap-3">
                <label htmlFor="size">Size</label>
                <select
                  id="size"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleSizeChange}
                >
                  <option value="regular">Regular</option>
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                </select>
                <label htmlFor="qty">Qty</label>
                <select
                  id="qty"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleQtyChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>

              <div className="d-flex justify-content-between gap-5  cart-btn pt-3">
                <div className="options">
                  <div>
                    <h5 className="option">Pizza Base</h5>
                    <SelectOptions
                      list={pizzaBase}
                      type="1"
                      price={price.regular}
                      addIngredients={addIngredients}
                    />
                  </div>
                  <div>
                    <h5 className="option">Cheese</h5>
                    <SelectOptions
                      list={cheese}
                      type="2"
                      price={price.regular}
                      addIngredients={addIngredients}
                    />
                  </div>
                  <div>
                    <h5 className="option">Sauce</h5>
                    <SelectOptions
                      list={sauce}
                      type="3"
                      price={price.regular}
                      addIngredients={addIngredients}
                    />
                  </div>
                  <div>
                    <h5 className="option">Toppings</h5>
                    <SelectOptions
                      list={toppings}
                      type="4"
                      price={price.regular}
                      addIngredients={addIngredients}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-footer">
            <div>₹ {calculateTotal()}</div>

            {!addedToCart ? (
              <button
                onClick={handleAddToCart}
                className="btn btn-primary custom-btn"
              >
                Add to Cart
              </button>
            ) : (
              <Link to="/cart" className="btn btn-outline-primary custom-btn">
                Go to Cart
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="text-center p-5 border rounded bg-light">
          <i className="bi bi-pizza fs-1 mb-3"></i>
          <h2>Customize Your Own Pizza</h2>
          <p>Select a pizza to start customizing your perfect pizza.</p>
          <button>Start Customizing</button>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
