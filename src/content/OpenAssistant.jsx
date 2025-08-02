import React, { useEffect, useState } from 'react';

function AssistantAI({ tasks = [] }) {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [suggestion, setSuggestion] = useState('');

    useEffect(() => {
        const pending = tasks.filter(task => !task.completed);
        setPendingTasks(pending);

        if (pending.length > 0) {
            const urgent = pending.find(t => new Date(t.due) < new Date()) || pending[0];
            setSuggestion(`Try completing "${urgent.title}" first – it's important!`);
        } else {
            setSuggestion('All tasks done! 🎉 Take a break or plan something new.');
        }
    }, [tasks]);

    return (
        <div className="p-3 bg-light border rounded shadow-sm mb-4">
            <h5>🤖 Your AI Assistant</h5>
            <p>🔔 You have {pendingTasks.length} pending {pendingTasks.length === 1 ? 'task' : 'tasks'}.</p>
            <p>💡 Suggestion: {suggestion}</p>
        </div>
    );
}

export default AssistantAI;
