import './App.css';
import React from 'react';
import Stock from './Stock.js';
import Navbar from './Navbar.js';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Stock></Stock>
      <b>This API is give me only access 5 times in 1 minute , If page is stucted then wait 1 minute and refresh this page , ThankYou</b>
    </div>
  );
}

export default App;
