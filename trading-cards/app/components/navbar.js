import React from 'react';
import { useRef } from 'react';
import './navbar.css';

export default function NavBar() {
    const searchInputRef = useRef();
    
    function searchData(){//function to search data based on search value
        const searchVal = searchInputRef.current.value;
        //let searchResults = [...data]; //copy of data array
        console.log(searchVal);   
    }

    function enterKeyEvent(event){
        if (event.key === 'Enter'){
            event.preventDefault(); //prevent default behavior
            searchData(); //call search data function when 'Enter' key is pressed
        }
    }
    return(
        <nav id="navbar">
            <div className="navbar-left">
                <a href="/" className="navbar-brand"><h1>Decks</h1></a>
            </div>
            <div className="navbar-center">
                    <input ref={searchInputRef} type="search" placeholder="Search..." onKeyDown = {enterKeyEvent}/>
                    <button type="submit" onClick = {searchData}>
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