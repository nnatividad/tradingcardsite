// This is the main page of the application. It will be the first page that is loaded when the user visits the site.
import React from 'react';
import Navbar from './components/navbar.js';

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <div className="content">
        <h1>Welcome to tcgdex</h1>
        <p>tcgdex is a trading card game marketplace where you can buy, sell, and trade cards with other players.</p>
        <p>Sign in or create an account to get started!</p>
      </div>
    </div>
  );
}
