import React from 'react';
import logo from '../assets/logo.png';
import './navbar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="logo" src={logo} alt={logo} />
      </div>
    </div>
  );
};

export default NavBar;
