import React, { useEffect } from "react";
import { useCart, useDispatch } from "../../Store/context-store";
import Navigator from "../Navbar/Navigator";
import "./cart.css";
import emptyCart from "../../assets/emptyCart.jpg";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <>
        <Navigator />
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <div className="text-center">
            <img
              src={emptyCart}
              alt="Empty Cart"
              className="img-fluid mb-4"
              style={{ maxWidth: "300px" }} 
            />
            <h4 className="mt-2 fs-3" style={{paddingLeft:'3rem'}}>Your cart is empty</h4>
            <p className="text-muted mt-3" style={{paddingLeft:'3rem'}}>
              Looks like you haven't added anything to your cart. Go ahead &
              explore top categories.
            </p>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    console.log(data);
  }, []);
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:3000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE: ", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, pizza) => total + pizza.price, 0);

  return (
    <>
      <div className="navigator">
        <Navigator />
      </div>
      <div className="container mt-5">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="fs-4 cart-header">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Qty</th>
                <th scope="col">Size</th>
                <th scope="col">Summary</th>
                <th scope="col">Sub Total</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((pizza, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{pizza.name}</td>
                  <td>{pizza.count}</td>
                  <td>{pizza.size}</td>
                  {!pizza.ingredients.baseChosen.name ? (
                    <td>Regular Pizza</td>
                  ) : (
                    <>
                      <td style={{ height: "100%" }}>
                        <p>{pizza.ingredients.baseChosen.name}</p>
                        <p>{pizza.ingredients.cheeseChosen.name}</p>
                        <p>{pizza.ingredients.sauceChosen.name}</p>
                        <p>{pizza.ingredients.toppingChosen.name}</p>
                      </td>
                    </>
                  )}
                  <td>{pizza.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-xl"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <h2 className="fs-2 text-secondary">Total Amount: {totalPrice}/-</h2>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary btn-lg" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </>
  );
}
