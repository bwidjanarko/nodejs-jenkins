import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useToken from './../useToken';
import useRole from './../useRole';
import Login from "./../Login";


function UserAndTaskList() {
    const [users, setUsers] = useState("");
    const [tasks, setTasks] = useState("");
    const [username, setUserName] = useState();
    const {token, setToken} = useToken();
    const {role, setRole} = useRole();
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
    
    const users_url_auth = "http://" + ip + ":" + port + "/users_auth";
    const tasks_url_auth = "http://" + ip + ":" + port + "/tasks_auth";
    const users_url = "http://" + ip + ":" + port + "/users";
    const tasks_url = "http://" + ip + ":" + port + "/tasks";

    useEffect(() => {  
      getUsers();
      getTasks();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getUsersWithAuth = async () => {
      try {
        const response = await axios.get(`${users_url_auth}`, { headers: {"Authorization" : `Bearer ${token}`} });
        console.log("response : "+JSON.stringify(response.data));
        setUsers(response.data);
      } catch (error) {
        logout();
      }
    };

    const getUsers = async () => {
      try {
        const response = await axios.get(`${users_url}`);
        console.log("response : "+JSON.stringify(response.data));
        setUsers(response.data);
      } catch (error) {
        logout();
      }
    };

    const getTasksWithAuth = async () => {
      try {
        const response = await axios.get(`${tasks_url_auth}`, { headers: {"Authorization" : `Bearer ${token}`} });
        console.log("response : "+JSON.stringify(response.data));
        setTasks(response.data);
      } catch (error) {
        logout();
      }
    };

    const getTasks = async () => {
      try {
        const response = await axios.get(`${tasks_url}`);
        console.log("response : "+JSON.stringify(response.data));
        setTasks(response.data);
      } catch (error) {
        logout();
      }
    };

    const deleteUser = async (id) => {
        try {
          await axios.delete(`http://${ip}:${port}/users/${id}`);
          getUsers();
        } catch (error) {
          console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
          await axios.delete(`http://${ip}:${port}/tasks/${id}`);
          getTasks();
        } catch (error) {
          console.log(error);
        }
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setToken(null);
      setRole(null);
      return <Login setToken={setToken} />
    }

    console.log("Role After >>>", role);

    return (
        <div className="columns mt-5">
        <table className="table is-striped is-fullwidth mt-2">
        <tr>
        {users ? (
                  <div className="column is-half">     
                  <Link to="add_user" className="button is-success">
                    Add New User
                  </Link>
                  <table className="table is-striped is-fullwidth mt-2">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Token</th>
                        {console.log("role inside List : "+role)}
                        {role==='Admin' &&
                        <th>Edit</th>}
                        {role==='Admin' &&
                        <th>Delete</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.username}</td>
                          <td>{user.password}</td>
                          <td>{user.role}</td>
                          <td>{user.token}</td>
                          {role==='Admin' &&
                          <td>
                            <Link
                              to={`edit_user/${user._id}`}
                              className="button is-info is-small mr-1"
                            >
                              Edit User
                            </Link>
                          </td>}
                          {role==='Admin' &&
                          <td>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="button is-danger is-small"
                            >
                              Delete User
                            </button>
                          </td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
        ) : (
            <p>Waiting for users .. </p>                 
        )}
        </tr>
        <tr>
        {tasks ? (
                  <div className="column is-half">     
                  <Link to="add_task" className="button is-success">
                    Add New Task
                  </Link>
                  <table className="table is-striped is-fullwidth mt-2">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Assigned To</th>
                        {console.log("role inside List : "+role)}
                        {role==='Admin' &&
                        <th>Edit</th>}
                        {role==='Admin' &&
                        <th>Delete</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={task._id}>
                          <td>{index + 1}</td>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>{task.status}</td>
                          <td>{task.dueDate}</td>
                          <td>{task.assignedTo}</td>
                          {role==='Admin' &&
                          <td>
                            <Link
                              to={`edit_task/${task._id}`}
                              className="button is-info is-small mr-1"
                            >
                              Edit Task
                            </Link>
                          </td>}
                          {role==='Admin' &&
                          <td>
                            <button
                              onClick={() => deleteTask(task._id)}
                              className="button is-danger is-small"
                            >
                              Delete Task
                            </button>
                          </td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Link to="/" className="button is-danger" onClick={logout}>
                    Log Out
                  </Link>
                </div>
        ) : (
            <p>Waiting for tasks .. </p>                 
        )}
        </tr>
        </table>
        </div>
    )
}

export default UserAndTaskList;
