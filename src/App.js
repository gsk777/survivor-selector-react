import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';

import './App.css';

const App = () => {
  return (
    <div className="app-div">
      <div style={{ backgroundColor: "#404040" }}>
        <Header />
      </div>
      <Main />
    </div>
    
  );
}

export default App;
