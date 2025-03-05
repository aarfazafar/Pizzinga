import React, { useEffect, useState } from "react";
import { useCart, useDispatch } from "../../Store/context-store";
import Navigator from "../Navbar/Navigator";
import "./cart.css";
import emptyCart from "../../assets/emptyCart.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VITE_BASE_URL =  import.meta.env.MODE === "development"
? import.meta.env.VITE_BASE_URL_DEV
: import.meta.env.VITE_BASE_URL;

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();

  const [address, setAddress] = useState({
    area: "",
    city: "",
    state: "",
    zip: "",
  });
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    console.log(data);
  }, []);
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${VITE_BASE_URL}/api/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        address:address,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE: ", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
    if (response.status) {
      toast.success("Order Placed 🎉", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Failed to check out", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleOnChange = (event) => {
    setAddress({...address,[event.target.name]: event.target.value})
  }
  let totalPrice = data.reduce((total, pizza) => total + pizza.price, 0);


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
            <h4 className="mt-2 fs-3" style={{ paddingLeft: "3rem" }}>
              Your cart is empty
            </h4>
            <p className="text-muted mt-3" style={{ paddingLeft: "3rem" }}>
              Looks like you haven't added anything to your cart. Go ahead &
              explore top categories.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="navigator">
        <Navigator />
      </div>
      <div className="container cart-body card p-4">
        <div className="table-responsive p-2">
          <table className="table table-hover">
            <thead className="cart-header">
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
        <div className="card mt-3 p-4">
          <h4>Deliver to </h4>

          {
            hasAddress? (
              <div  className=" d-flex gap-2">
              <div className="card p-2 w-100">
                {`${address.area}, ${address.city}, ${address.state}, ${address.zip}`}
              </div>
                <button className="btn btn-primary btn-sml" onClick={()=> setHasAddress(false)}>Change</button>
              </div>
            ):
          <form>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Address"
              value={address.area}
              name="area"
              onChange={handleOnChange}
            />
            <div className="form-row d-flex justify-content-between mt-2">
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={address.city}
                  name="city"
                  onChange={handleOnChange}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={address.state}
                  name="state"
                  onChange={handleOnChange}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Zip"
                  value={address.zip}
                  name="zip"
                  onChange={handleOnChange}
                />
              </div>
              <button type = 'button' className="btn btn-primary" onClick={()=> setHasAddress(true)}>Save</button>
            </div>
          </form>
          }
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
