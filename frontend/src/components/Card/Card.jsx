import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";
import { CardELements } from "../../Store/context-store";
const Card = ({ name, description, image, price,handleCustomization }) => {
  const [count, setCount] = useState(1)
  const [size, setSize] = useState('regular')
  const emitProps = () => {
    handleCustomization({name, description, price, image})
  }
  const handleQtyChange=(event)=> {
    console.log(event.target.value)
    setCount(event.target.value)
    // console.log(price)
  }
  const handleSizeChange=(event)=> {
    setSize(event.target.value)
    // console.log(price)
  }
  const totalPrice  = Math.ceil((price[`${size}`]*30)*count)

  return (
    <div
      className="card"
      style={{ width: "18rem", maxHeight: "23rem", display: "inline-block" }}
    >
      <img src={image} className="card-img-top custom-img" alt="..." />

      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between"><span>{name}</span><span>₹ {totalPrice}</span></h5>
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
            <button className="btn btn-primary custom-btn" onClick={emitProps}>
              Customise
            </button>
            <Link to="/" className="btn btn-primary custom-btn">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
