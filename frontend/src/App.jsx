import { useState } from "react";
import "./App.css";
// import Navbar from './components/Navbar/Navbar'
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import { CartProvider } from "./Store/context-store";
import Cart from "./components/Cart/Cart";
function App() {
  const [count, setCount] = useState(0);
  // const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
