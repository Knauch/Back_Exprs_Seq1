import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const NavBar =() => {

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>
        <div className="container">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">View Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/addProduct">Add Product</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default NavBar;