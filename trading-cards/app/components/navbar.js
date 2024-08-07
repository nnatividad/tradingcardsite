import React from 'react';
import './navbar.css';

export default function NavBar() {
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="navbar-brand"><h1>tcgdex</h1></a>
            </div>
            <div className="navbar-center">
                    <input className="text" placeholder="Search..."/>
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>
                        <div className="links">
                            <a href="/create-account">Login</a>
                        </div>
                    </li>
                    <li>
                        <div className="links">
                            <a href="/sign-in">Sign Up</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};