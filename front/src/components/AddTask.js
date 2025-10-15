import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
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
  const tasks_url = "http://" + ip + ":" + port + "/tasks";

  const saveTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${tasks_url}`, {
        title,
        description,
        status,
        dueDate,
        assignedTo
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={saveTask}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">DueDate</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">AssignedTo</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Assigned To"
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

export default AddTask;
