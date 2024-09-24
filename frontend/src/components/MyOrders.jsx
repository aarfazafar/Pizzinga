import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import orderImage from '../assets/orders.avif'
import './myorders.css'
import Navigator from "./Navbar/Navigator";
const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      const data = await response.json();
      setOrderData(data.orderData?.order_data || []);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  const calculateTotal =(order) => {
    // order.reduce((total, )=> {

    // }) 
    let total = 0
    for(let i = 1; i < order.length; i++) {
      total = total+order[i].price    }
      return total

  }
  return (
    <div>
      <Navigator />
      <div className="container order-data">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((order, orderIndex) => (
              <div key={orderIndex} className="col-12">
                <h3 className="mt-3 order-date">Order Date: {order[0]?.Order_date}</h3>
                <hr />
                <div className="row">
                  {order.slice(1).map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="col-12 col-md-6 col-lg-3 mb-4"
                    >
                      <div className="card order-card" style={{ width: "16rem" }}>
                        <img
                          src={item.image}
                          className="card-img-top"
                          alt={item.name}
                          style={{ height: "140px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title ordered-card-title">{item.name}</h5>
                          <p className="card-text order-details">
                            Quantity: {item.count}
                            <br />
                            Size: {item.size}
                            <br />
                            Price: ₹{item.price}/-
                          </p>
                          {item.ingredients && (
                            <div className="mt-3">
                              <div className='order-description'>
                                {item.ingredients.baseChosen && (
                                  <p>
                                    Base: {item.ingredients.baseChosen.name} 
                                  </p>
                                )}
                                {item.ingredients.cheeseChosen && item.ingredients.cheeseChosen.name && (
                                  <p>
                                    Cheese: {item.ingredients.cheeseChosen.name} 
                                  </p>
                                )}
                                {item.ingredients.sauceChosen && (
                                  <p>
                                    Sauce: {item.ingredients.sauceChosen.name}
                                  </p>
                                )}
                                {item.ingredients.toppingChosen && (
                                  <p>
                                    Topping: {item.ingredients.toppingChosen.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            <div className="card-title mb-1"> Order Total: ₹ {calculateTotal(order)}/-</div>
                </div>
              </div>
            ))
          ) : (
            <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <div className="text-center">
            <img
              src={orderImage}
              alt="Empty Cart"
              className="img-fluid mb-4"
              style={{ maxWidth: "300px" }} 
            />
            <h4 className="mt-2 fs-3" style={{paddingLeft:'3rem'}}>No Orders Found</h4>
            <p className="text-muted mt-3" style={{paddingLeft:'3rem'}}>
              Looks like you haven't made any order. Go ahead &
              explore top categories.
            </p>
          </div>
        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
