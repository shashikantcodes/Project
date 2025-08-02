import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            const task = {
                id: Date.now(),
                text: newTask,
                createdAt: new Date().toLocaleString(),
            };
            setTasks([task, ...tasks]);
            setNewTask('');
        }
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">✅ Your Tasks</h2>

            <form onSubmit={handleAddTask} className="mb-4">
                <div className="d-flex gap-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        ➕ Add
                    </button>
                </div>
            </form>

            <div className="row">
                {tasks.length === 0 ? (
                    <p className="text-muted">No tasks yet. Add one above.</p>
                ) : (
                    tasks.map((task) => (
                        <div className="col-md-4 mb-3" key={task.id}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <p className="card-text">{task.text}</p>
                                    <small className="text-muted">{task.createdAt}</small>
                                    <div className="mt-3 d-flex justify-content-end">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(task.id)}
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

export default CreateTask;
