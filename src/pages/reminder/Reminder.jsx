import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reminders = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (newReminder.trim()) {
      const reminder = {
        id: Date.now(),
        text: newReminder,
        createdAt: new Date().toLocaleString(),
      };
      setReminders([reminder, ...reminders]);
      setNewReminder('');
    }
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🔔 Your Reminders</h2>

      <form onSubmit={handleAddReminder} className="mb-4">
        <div className="d-flex gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new reminder..."
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            ➕ Add
          </button>
        </div>
      </form>

      <div className="row">
        {reminders.length === 0 ? (
          <p className="text-muted">No reminders yet. Add one above.</p>
        ) : (
          reminders.map((reminder) => (
            <div className="col-md-4 mb-3" key={reminder.id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <p className="card-text">{reminder.text}</p>
                  <small className="text-muted">{reminder.createdAt}</small>
                  <div className="mt-3 d-flex justify-content-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(reminder.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reminders;
