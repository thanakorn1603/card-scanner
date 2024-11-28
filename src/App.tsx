import React from 'react';
import logo from './logo.svg';
import './App.css';
import NCPCardScanner from './NCPCardScanner/NCPCardScanner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <NCPCardScanner />
      </header>
    </div>
  );
}

export default App;
