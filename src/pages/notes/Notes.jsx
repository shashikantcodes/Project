import React, { useState, useEffect } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // ✅ 1. Load saved notes from localStorage on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  // ✅ 2. Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ✅ 3. Add new note
  const handleAdd = () => {
    if (text.trim()) {
      const newNote = { id: Date.now(), content: text.trim() };
      setNotes((prev) => [...prev, newNote]);
      setText("");
    }
  };

  // ✅ 4. Delete note
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📝 Notes</h2>

      <div className="d-flex flex-column gap-2 mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Save Note
        </button>
      </div>

      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <ul className="list-group">
          {notes.map((note) => (
            <li
              key={note.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{note.content}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(note.id)}
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

export default Notes;
