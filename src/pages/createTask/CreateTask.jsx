import React, { useState, useEffect } from "react";

const CreateTask = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
    };

    const updatedTasks = [...taskList, newTask];
    setTaskList(updatedTasks);
    setTask(""); // clear input
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // 👈 Save to localStorage
  };

  return (
    <div className="container mt-4">
      <h2>📝 Create Task</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {taskList.map((t) => (
          <li className="list-group-item" key={t.id}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTask;
