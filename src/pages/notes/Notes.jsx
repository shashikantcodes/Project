import React, { useState, useEffect } from "react";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Load from localStorage on first mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("quickdesk-notes"));
        if (stored) setNotes(stored);
    }, []);

    // Save on change
    useEffect(() => {
        localStorage.setItem("quickdesk-notes", JSON.stringify(notes));
    }, [notes]);

    const handleAddNote = () => {
        if (!title.trim() || !content.trim()) return;

        const newNote = {
            id: Date.now(),
            title,
            content,
            createdAt: new Date().toLocaleString(),
        };

        setNotes([newNote, ...notes]);
        setTitle("");
        setContent("");
    };

    const handleDelete = (id) => {
        setNotes(notes.filter((n) => n.id !== id));
    };

    return (
        <main className="container py-5 text-dark dark:text-white">
            <div className="mb-4 text-center">
                <h2 className="fw-bold">📝 Quick Notes</h2>
                <p className="text-muted">Save your ideas and thoughts instantly.</p>
            </div>

            {/* Add Note */}
            <div className="card shadow-sm p-4 mb-5 bg-light dark:bg-dark border-0">
                <input
                    className="form-control mb-2"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-3"
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                />
                <button
                    onClick={handleAddNote}
                    className="btn btn-primary w-100 py-2 shadow-sm"
                >
                    ➕ Add Note
                </button>
            </div>

            {/* Notes Display */}
            {notes.length === 0 ? (
                <div className="text-center text-muted">
                    <p>No notes found. Start writing something!</p>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png"
                        alt="No notes"
                        height={120}
                        className="opacity-50"
                    />
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {notes.map((note) => (
                        <div className="col" key={note.id}>
                            <div className="card h-100 shadow-sm bg-white dark:bg-secondary">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{note.title}</h5>
                                    <p className="card-text">{note.content}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <small className="text-muted">{note.createdAt}</small>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        ❌ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default Notes;
