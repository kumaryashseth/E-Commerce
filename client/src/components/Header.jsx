import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Header = () => {
  
  const [auth, setAuth] = useAuth(); // ✅ FIXED

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ""
    });
    localStorage.removeItem('auth');
    toast.success('Logout Success');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <NavLink to="/" className="navbar-brand">🛒 Ecommerce</NavLink>

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>

            {
              !auth?.user ? ( // ✅ SAFE
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link btn btn-link">
                      Logout
                    </button>
                  </li>
                </>
              )
            }

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;