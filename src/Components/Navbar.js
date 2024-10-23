import React, { useEffect, useState } from "react";
import { auth } from "../firebase"; // Import auth
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { toast } from "react-toastify";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user if logged in
      } else {
        setUser(null); // No user logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const openNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          Health <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li><Link to="/" className="navbar-links">Home</Link></li>
        <li><a href="#services" className="navbar-links">Services</a></li>
        <li><a href="#about" className="navbar-links">About</a></li>
        <li><a href="#reviews" className="navbar-links">Reviews</a></li>
        <li><a href="#doctors" className="navbar-links">Doctors</a></li>
        
      </ul>

      {/* Login button on the rightmost end */}
      <div className="navbar-login">
        {user ? (
          <>
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="navbar-profile-pic" 
              onClick={() => navigate("/profile")} // Navigate to Profile on click
            />
            &nbsp;
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button className="navbar-btn">Login/SignUp</button>
          </Link>
        )}
      </div>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li><Link onClick={openNav} to="/">Home</Link></li>
          <li><a onClick={openNav} href="#services">Services</a></li>
          <li><a onClick={openNav} href="#about">About</a></li>
          <li><a onClick={openNav} href="#reviews">Reviews</a></li>
          <li><a onClick={openNav} href="#doctors">Doctors</a></li>
          {user ? (
            <li>
              <span onClick={() => { openNav(); navigate("/profile"); }} className="mobile-navbar-links">{user.displayName}</span>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button onClick={openNav} className="mobile-navbar-btn">Login/SignUp</button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon icon={faBars} onClick={openNav} className="hamb-icon" />
      </div>
    </div>
  );
}

export default Navbar;