import { useState } from "react";
import "./App.css";
// import Navbar from './components/Navbar/Navbar'
import Home from "./components/Home";
import Login from "./components/Auth/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
