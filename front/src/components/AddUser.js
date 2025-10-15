import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
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
  const users_url = "http://" + ip + ":" + port + "/users";

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${users_url}`, {
        name,
        email,
        role,
        username,
        password,
        token
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Token</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Token"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
