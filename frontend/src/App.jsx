import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import { CartProvider } from "./Store/context-store";
import Cart from "./components/Cart/Cart";
import MyOrders from "./components/MyOrders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/myorder" element={<MyOrders />} />
        </Routes>
      </Router>
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
