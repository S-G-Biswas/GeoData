import React from 'react';
import WorldMap from './components/Map';
import Navbar from './Routes/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Login from './components/Login';
import SignUp from './components/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
            <Route path="/" element={<WorldMap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
