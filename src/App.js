import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';

import useToken from './Hooks/useToken';
import './App.css';

export const UserContext = React.createContext();

const App = () => {
  const { token, setToken } = useToken();

  const ContextValue = {
    token,
    setToken
  };

  return (
    <UserContext.Provider value={ ContextValue }>
      <div className="app-div">
        <div style={{ backgroundColor: "#404040" }}>
          <Header token={token}/>
        </div>
        <Main />
      </div>
    </UserContext.Provider>
  );
}

export default App;
