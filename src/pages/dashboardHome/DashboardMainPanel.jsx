import React, { useState, useEffect } from "react";

const DashboardMainPanel = () => {
  // Tasks
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  // Reports
  const [reports, setReports] = useState(() => {
    const stored = localStorage.getItem("reports");
    return stored ? JSON.parse(stored) : [];
  });

  // AI Assistant
  const [aiInput, setAiInput] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [logs, setLogs] = useState(() => {
    const stored = localStorage.getItem("logs");
    return stored ? JSON.parse(stored) : [];
  });

  // Input for adding manual task
  const [taskInput, setTaskInput] = useState("");

  // Input for generating report
  const [reportInput, setReportInput] = useState("");

  // =============== AI HANDLERS =================
  const handleAiPrompt = () => {
    if (!aiInput.trim()) return;
    const mockResponse = `Suggested Task: "${aiInput}" (AI generated)`;
    setAiSuggestion(mockResponse);
    setLogs((prev) => [...prev, `🤖 AI: "${mockResponse}"`]);
    setAiInput("");
  };

  const addAiSuggestionToTasks = () => {
    if (aiSuggestion) {
      const newTask = {
        id: Date.now(),
        text: aiSuggestion,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setLogs((prev) => [...prev, `✅ Task added from AI: "${aiSuggestion}"`]);
      setAiSuggestion("");
    }
  };

  // =============== TASK HANDLERS =================
  const addManualTask = () => {
    if (!taskInput.trim()) return;
    const newTask = { id: Date.now(), text: taskInput, completed: false };
    setTasks((prev) => [...prev, newTask]);
    setLogs((prev) => [...prev, `📌 Task added manually: "${taskInput}"`]);
    setTaskInput("");
  };

  const toggleTaskCompletion = (taskId) => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  // =============== REPORT HANDLERS =================
  const generateReport = () => {
    if (!reportInput.trim()) return;
    const newReport = {
      id: Date.now(),
      title: reportInput,
      generatedAt: new Date().toLocaleString(),
    };
    setReports((prev) => [...prev, newReport]);
    setLogs((prev) => [...prev, `📄 Report generated: "${reportInput}"`]);
    setReportInput("");
  };

  // =============== LOCAL STORAGE SYNC =================
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  return (
    <div className="container mt-4">
      {/* AI Assistant Panel */}
      <div className="card shadow mb-4" style={{ background: "linear-gradient(120deg, #e0f7fa, #e1bee7)" }}>
        <div className="card-header fw-bold text-dark">🤖 AI Assistant Panel</div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Ask AI to suggest a task..."
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleAiPrompt}>
            Ask AI
          </button>

          {aiSuggestion && (
            <div className="alert alert-info mt-3">
              <p>{aiSuggestion}</p>
              <button className="btn btn-success btn-sm" onClick={addAiSuggestionToTasks}>
                ➕ Add to Tasks
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Panel */}
      <div className="card shadow mb-4">
        <div className="card-header fw-bold">📋 Tasks</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button className="btn btn-success" onClick={addManualTask}>
              Add Task
            </button>
          </div>
          <ul className="list-group">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  task.completed ? "list-group-item-success" : ""
                }`}
              >
                <span>{task.text}</span>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Report Generator */}
      <div className="card shadow mb-4">
        <div className="card-header fw-bold">📄 Generate Report</div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Report Title..."
            value={reportInput}
            onChange={(e) => setReportInput(e.target.value)}
          />
          <button className="btn btn-dark mt-2" onClick={generateReport}>
            Generate Report
          </button>
          <ul className="list-group mt-3">
            {reports.map((r) => (
              <li key={r.id} className="list-group-item">
                <strong>{r.title}</strong> <br />
                <small className="text-muted">Generated: {r.generatedAt}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div className="card shadow mb-4">
          <div className="card-header fw-bold">📜 Recent Activity Log</div>
          <div className="card-body">
            <ul className="list-group small">
              {logs.slice(-10).reverse().map((log, index) => (
                <li key={index} className="list-group-item">
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMainPanel;
