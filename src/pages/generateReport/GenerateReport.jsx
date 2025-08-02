import React, { useState } from 'react';

function GenerateReport() {
    const [logs, setLogs] = useState([]);
    const [newLog, setNewLog] = useState('');

    const handleAddLog = (e) => {
        e.preventDefault();
        if (newLog.trim()) {
            const entry = {
                id: Date.now(),
                content: newLog,
                timestamp: new Date().toLocaleString(),
            };
            setLogs([entry, ...logs]);
            setNewLog('');
        }
    };

    const handleDeleteLog = (id) => {
        setLogs(logs.filter((log) => log.id !== id));
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">📊 Activity Report</h2>

            <form onSubmit={handleAddLog} className="mb-4">
                <div className="d-flex gap-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add a new log entry..."
                        value={newLog}
                        onChange={(e) => setNewLog(e.target.value)}
                    />
                    <button type="submit" className="btn btn-warning text-dark">
                        ➕ Add Entry
                    </button>
                </div>
            </form>

            {logs.length === 0 ? (
                <p className="text-muted">No logs yet. Add some above.</p>
            ) : (
                <div className="row">
                    {logs.map((log) => (
                        <div className="col-md-6 mb-3" key={log.id}>
                            <div className="card border-warning shadow-sm">
                                <div className="card-body">
                                    <p className="mb-2">{log.content}</p>
                                    <small className="text-muted">{log.timestamp}</small>
                                    <div className="mt-2 text-end">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteLog(log.id)}
                                        >
                                            🗑️ Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GenerateReport;
