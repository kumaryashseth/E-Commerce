import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand"> 🛒 Ecommerce </NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/Home" className="nav-link " aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link " aria-current="page">Category</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">Regiser</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">cart (0)</NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Header