import React, { useState, useEffect } from "react";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Load from localStorage on mount
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("quickdesk-notes"));
        if (storedNotes) setNotes(storedNotes);
    }, []);

    // Save to localStorage whenever notes update
    useEffect(() => {
        localStorage.setItem("quickdesk-notes", JSON.stringify(notes));
    }, [notes]);

    const handleAddNote = () => {
        if (title.trim() && content.trim()) {
            const newNote = {
                id: Date.now(),
                title,
                content,
                createdAt: new Date().toLocaleString()
            };
            setNotes([newNote, ...notes]);
            setTitle("");
            setContent("");
        }
    };

    const handleDelete = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
    };

    return (
        <main className="container py-5 text-dark dark:text-white">
            <h2 className="fw-bold mb-4">📝 Your Notes</h2>

            {/* Add Note Form */}
            <div className="mb-4 card p-4 shadow-sm bg-light dark:bg-dark border-0">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-3"
                    placeholder="Note Content"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button className="btn btn-primary" onClick={handleAddNote}>
                    ➕ Add Note
                </button>
            </div>

            {/* Notes List */}
            {notes.length === 0 ? (
                <p className="text-muted">No notes yet. Start by adding one!</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {notes.map((note) => (
                        <div key={note.id} className="col">
                            <div className="card h-100 shadow-sm bg-white dark:bg-secondary border-0">
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">{note.content}</p>
                                </div>
                                <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                                    <small className="text-muted">{note.createdAt}</small>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(note.id)}>
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
