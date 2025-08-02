import React, { useState, useEffect } from "react";

// Utility function to load from localStorage
const loadData = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
};

const DashboardHome = () => {
    const [tasks, setTasks] = useState(() => loadData("tasks", []));
    const [reports, setReports] = useState(() => loadData("reports", []));
    const [reminders, setReminders] = useState(() => loadData("reminders", []));
    const [logs, setLogs] = useState(() => loadData("logs", []));
    const [taskInput, setTaskInput] = useState("");
    const [reportInput, setReportInput] = useState("");
    const [reminderInput, setReminderInput] = useState("");
    const [aiInput, setAiInput] = useState("");
    const [aiSuggestion, setAiSuggestion] = useState("");

    // Save to localStorage when data changes
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("reports", JSON.stringify(reports));
    }, [reports]);

    useEffect(() => {
        localStorage.setItem("reminders", JSON.stringify(reminders));
    }, [reminders]);

    useEffect(() => {
        localStorage.setItem("logs", JSON.stringify(logs));
    }, [logs]);

    // Generic add function
    const addItem = (type, input, setInput, data, setData) => {
        if (!input.trim()) return;
        const item = { id: Date.now(), text: input };
        const updated = [...data, item];
        setData(updated);
        setInput("");
        setLogs(prev => [...prev, `➕ ${type} added: "${input}"`]);
    };

    // AI prompt
    const handleAiPrompt = () => {
        if (!aiInput.trim()) return;
        const mock = `Suggested Task: "${aiInput}" (reviewed by AI)`;
        setAiSuggestion(mock);
        setLogs(prev => [...prev, `🤖 AI suggested: "${mock}"`]);
        setAiInput("");
    };

    const addAiSuggestionToTasks = () => {
        if (aiSuggestion) {
            const task = { id: Date.now(), text: aiSuggestion };
            const updated = [...tasks, task];
            setTasks(updated);
            setLogs(prev => [...prev, `✅ Task added: "${aiSuggestion}"`]);
            setAiSuggestion("");
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">📊 Dashboard Home</h2>
            <div className="row g-4">
                {/* Create Task */}
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-header">📝 Create Task</div>
                        <div className="card-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a task..."
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                            />
                            <button
                                className="btn btn-primary mt-2"
                                onClick={() => addItem("Task", taskInput, setTaskInput, tasks, setTasks)}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>

                {/* Generate Report */}
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-header">📄 Generate Report</div>
                        <div className="card-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Write a report summary..."
                                value={reportInput}
                                onChange={(e) => setReportInput(e.target.value)}
                            />
                            <button
                                className="btn btn-success mt-2"
                                onClick={() => addItem("Report", reportInput, setReportInput, reports, setReports)}
                            >
                                Save Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reminders */}
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-header">⏰ Add Reminder</div>
                        <div className="card-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Set a reminder..."
                                value={reminderInput}
                                onChange={(e) => setReminderInput(e.target.value)}
                            />
                            <button
                                className="btn btn-warning mt-2"
                                onClick={() => addItem("Reminder", reminderInput, setReminderInput, reminders, setReminders)}
                            >
                                Set Reminder
                            </button>
                        </div>
                    </div>
                </div>

                {/* AI Assistant Panel */}
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header">🤖 AI Assistant Panel</div>
                        <div className="card-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ask AI to suggest a task..."
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                            />
                            <button
                                className="btn btn-dark mt-2"
                                onClick={handleAiPrompt}
                            >
                                Ask AI
                            </button>

                            {aiSuggestion && (
                                <div className="alert alert-info mt-3">
                                    <p className="mb-2">{aiSuggestion}</p>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={addAiSuggestionToTasks}
                                    >
                                        ➕ Add to Tasks
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Log */}
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header">📜 Recent Activity Log</div>
                        <div className="card-body">
                            <ul className="list-group small">
                                {logs.slice(-6).reverse().map((log, index) => (
                                    <li key={index} className="list-group-item">
                                        {log}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Summary Section */}
            <div className="row mt-5">
                <div className="col-md-4">
                    <h5>📌 Tasks</h5>
                    <ul className="list-group small">
                        {tasks.map(task => (
                            <li key={task.id} className="list-group-item">{task.text}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>📑 Reports</h5>
                    <ul className="list-group small">
                        {reports.map(r => (
                            <li key={r.id} className="list-group-item">{r.text}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>🕒 Reminders</h5>
                    <ul className="list-group small">
                        {reminders.map(r => (
                            <li key={r.id} className="list-group-item">{r.text}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
