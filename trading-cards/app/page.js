// This is the main page of the application. It will be the first page that is loaded when the user visits the site.
"use client";
import React from 'react';
import Navbar from './components/navbar.js';
import Table from './components/table.js';

export default function Home() {
  return (
    <div id="page">
      <Navbar />
      <Table />
    </div>
  );
}
