import React, { useState, useEffect } from "react";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [input, setInput] = useState("");

  // ✅ 1. Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(stored);
  }, []);

  // ✅ 2. Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // ✅ 3. Add reminder
  const handleAdd = () => {
    if (input.trim()) {
      const newReminder = { id: Date.now(), text: input.trim() };
      setReminders((prev) => [...prev, newReminder]);
      setInput("");
    }
  };

  // ✅ 4. Delete reminder
  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">⏰ Reminders</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter reminder"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-warning" onClick={handleAdd}>
          Add
        </button>
      </div>

      {reminders.length === 0 ? (
        <p>No reminders set.</p>
      ) : (
        <ul className="list-group">
          {reminders.map((reminder) => (
            <li
              key={reminder.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {reminder.text}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(reminder.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reminders;
