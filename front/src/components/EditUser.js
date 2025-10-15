import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./../Login";

function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [token, setToken] = useState("test123");
  const navigate = useNavigate(); 
  const { id } = useParams();
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
  const users_url = "http://" + ip + ":" + port + "/users/";

  useEffect(() => { 
    getUserById();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getUserById = async () => {
    const response = await axios.get(`${users_url}${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setRole(response.data.role);
    setUsername(response.data.username);
    setPassword(response.data.password);
    setToken(response.data.token);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${users_url}${id}`, {
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

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="columns mt-5">   
      <div className="column is-half">
        <form onSubmit={updateUser}>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
