import { useState } from "react";

// custom hook for handling JWTs
function useToken() {
    const getToken = () => {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      if (userToken === null) {
        return undefined;
      } else {
        return userToken;
      }
    }
    const [token, setToken] = useState(getToken());
  
    const saveToken = (userToken) => {
      if (userToken === undefined) {
        setToken(userToken);
      } else {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
      }
    }
    return {
      setToken: saveToken,
      token
    }
  }

  export default useToken;