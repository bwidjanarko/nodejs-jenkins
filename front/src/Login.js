import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  console.log("Login.js Credentials : " + JSON.stringify(credentials));
  var ip = process.env.REACT_APP_BACKEND_IP;
  var port = process.env.REACT_APP_BACKEND_PORT;
  console.log("REACT IP : "+ip);
  console.log("REACT PORT : "+port);
  //ip = window.config.REACT_APP_BACKEND_IP;
  //port = window.config.REACT_APP_BACKEND_PORT;
  //console.log("REACT IP : "+ip);
  //console.log("REACT PORT : "+port);
  if (ip === undefined) {
      ip = "192.168.56.41";
  }
  if (port === undefined) {
      port = 8099;
  }
  const login_url = "http://" + ip + ":" + port + "/login";
  console.log("URL : "+login_url);
  return fetch(login_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 export default function Login({ setToken, setRole }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const user = await loginUser({
      username,
      password
    });
    console.log("Login.js Token : " + JSON.stringify(user.token));
    console.log("Login.js Role : " + JSON.stringify(user.role));
    setToken(user.token);
    //setRole(user.role);
    localStorage.setItem('role', JSON.stringify(user.role));
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired
};
