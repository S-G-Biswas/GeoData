import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import '../styles/navbar.css';


const Navbar = () => {

  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [menuOpen,setMenuOpen] = useState(false)
  const [loggedIn,setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const toast = useToast();

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    const email = window.localStorage.getItem("email");
    if (isLoggedIn) {
      setLoggedIn(true);
      setUserEmail(email);
    }
  }, []);
  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setLoggedIn(false);
    toast({
      title: "Logout Successful",
      description: "You have successfully logged out.",
      status: "success",
      duration: 8000,
      isClosable: true,
    });
    window.location.href = "/";
  };

    return (
      <nav className="navbar">
        {/* Left side logo */}
        <div className="navbar__left">
          <h3>Geo-Data</h3>
        </div>
  
        {/* Right side options */}
        <div className="navbar__right">
          <div className="menu" onClick={()=>{
            setMenuOpen(!menuOpen)
          }}>
      <span></span>
      <span></span>
      <span></span>
          </div>
          <ul>
            <li className="navbar__item"><a href="/">Home</a></li>
          
          {loggedIn ? (
            <li className="navbar__item"><a href="#" onClick={handleLogout}>Logout</a></li>
          ) : (
            <>
              <li className="navbar__item"><a href="/login">Login</a></li>
              <li className="navbar__item"><a href="/register">SignUp</a></li>
            </>
          )}
          </ul>
        </div>
      </nav>
    );
  }
  
  export default Navbar;