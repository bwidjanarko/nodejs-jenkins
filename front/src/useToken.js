import { useState } from 'react';

export default function useToken() {

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken) {
       console.log("Get Token : "+userToken);
    } else {
       console.log("Get Token : null");
    }
    //return userToken?.token
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken))
    if (userToken) {
       console.log("Save Token : "+JSON.stringify(userToken));
    } else {
       console.log("Save Token : null");
    }
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}
