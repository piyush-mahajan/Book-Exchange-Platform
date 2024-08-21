import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Books from "./components/Books";
import Matchmaking from "./components/Matchmaking";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<ProtectedRoute element={<Books />} />} />
        <Route
          path="/matchmaking"
          element={<ProtectedRoute element={<Matchmaking />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
