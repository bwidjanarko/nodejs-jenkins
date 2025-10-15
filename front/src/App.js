import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTaskList from "./components/UserTaskList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import Login from "./Login";
import useToken from './useToken';
import PropTypes from 'prop-types';

function App() {
  const { token, setToken } = useToken();
  console.log("App.js Token : " + JSON.stringify(token));
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="app">
        <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserTaskList />} />
            <Route path="add_user" element={<AddUser />} />
            <Route path="edit_user/:id" element={<EditUser />} />
            <Route path="add_task" element={<AddTask />} />
            <Route path="edit_task/:id" element={<EditTask />} />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
