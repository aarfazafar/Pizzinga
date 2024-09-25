import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useCart } from "../../Store/context-store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./card.css";
const Card = ({ pizza, handleCustomization }) => {
  const { _id, name, description, image_url, price } = pizza;
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("regular");
  const emitProps = (_id, name, description, price, image_url) => {
    handleCustomization({ _id, name, description, price, image_url });
  };
  const handleQtyChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setCount(event.target.value);
    // console.log(price)
  };
  const handleSizeChange = (event) => {
    event.preventDefault();
    setSize(event.target.value);
    // console.log(price)
  };

  const [ingredients, setIngredients] = useState({
    baseChosen: "",
    cheeseChosen: "",
    sauceChosen: "",
    toppingChosen: "",
  });
  const [addedToCart, setAddedTocart] = useState(false);
  // let totalPrice =  Math.ceil((price[`${size}`]*30)*count);

  const calculateTotal = () => {
    return Math.ceil(price[`${size}`] * 30 * count);
  };
  let dispatch = useDispatch();
  let data = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await dispatch({
      type: "ADD",
      id: _id,
      name,
      image: image_url,
      price: calculateTotal(),
      count,
      size,
      ingredients: ingredients,
    });
    setAddedTocart(true);
    toast.success("Added to cart 🎉", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const totalPrice = Math.ceil(price[`${size}`] * 30 * count);

  return (
    <div
      className="card"
      style={{ width: "18rem", maxHeight: "24rem", display: "inline-block" }}
    >
      <img
        src={
          image_url
            ? image_url
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog4ACm0vIRHdmml_FgepznxIz9arjHXx4gA&s"
        }
        className="card-img-top custom-img"
        alt="..."
      />

      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between">
          <span>{name}</span>
          <span>₹ {totalPrice}</span>
        </h5>
        <p className="card-text card-title">{description}</p>
        <hr />
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
            <button
              className="btn btn-primary custom-btn"
              onClick={() =>
                emitProps(_id, name, description, price, image_url)
              }
            >
              Customise
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default Card;
