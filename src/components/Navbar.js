import React, { useContext }  from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../AuthContext';

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-logo">JobPortal</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/companies">Companies</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        
        {!auth.isLoggedIn && (
          <>
            <li><Link to="/RegisterPage">Register</Link></li>
            <li><Link to="/LoginPage">Login</Link></li>
          </>
        )}

        {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      </ul>
      {auth.isJobSeeker && (
        <button className="navbar-btn">Post a Job</button>
      )}
      
    </nav>
  );
};

export default Navbar;
