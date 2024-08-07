// This is the main page of the application. It will be the first page that is loaded when the user visits the site.
import React from 'react';
import Navbar from './components/navbar.js';

export default function Home() {
  return (
    <div id="page">
      <Navbar />
      <div id="content">
        <h1>Welcome to tcgdex</h1>
        <p>tcgdex is your guide to finding accurate and up-to-date prices for trading cards.</p>
        <p>Sign in or create an account to get started!</p>
      </div>
    </div>
  );
}
