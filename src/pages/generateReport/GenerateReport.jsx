import React from "react";

const GenerateReport = () => {
  // Get all data from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  const currentDate = new Date().toLocaleString();

  const handleDownload = (type) => {
    const report = {
      generatedAt: currentDate,
      tasks,
      reminders,
      notes,
    };

    let fileContent;
    let fileName = `quick-desk-report-${Date.now()}`;
    let blob;

    if (type === "json") {
      fileContent = JSON.stringify(report, null, 2);
      blob = new Blob([fileContent], { type: "application/json" });
      fileName += ".json";
    } else if (type === "text") {
      fileContent = `Quick Desk AI Report (${currentDate})\n\nTasks:\n${tasks
        .map((t) => `- ${t.text}`)
        .join("\n")}\n\nReminders:\n${reminders
        .map((r) => `- ${r.text} at ${r.time}`)
        .join("\n")}\n\nNotes:\n${notes
        .map((n) => `- ${n.content}`)
        .join("\n")}`;
      blob = new Blob([fileContent], { type: "text/plain" });
      fileName += ".txt";
    } else if (type === "pdf") {
      alert("PDF export requires a package like jsPDF. Want me to add it?");
      return;
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📊 Generate Activity Report</h2>

      <div className="card p-3 mb-3 bg-light">
        <h5>📅 Date: {currentDate}</h5>
        <p>
          This report includes all saved <b>Tasks</b>, <b>Reminders</b>, and{" "}
          <b>Notes</b>.
        </p>
      </div>

      <div className="d-flex gap-2 mb-4">
        <button className="btn btn-success" onClick={() => handleDownload("json")}>
          Export as JSON
        </button>
        <button className="btn btn-secondary" onClick={() => handleDownload("text")}>
          Export as Text
        </button>
        <button className="btn btn-outline-danger" onClick={() => handleDownload("pdf")}>
          Export as PDF
        </button>
      </div>

      <div>
        <h5>🔹 Tasks:</h5>
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>

        <h5 className="mt-3">🔹 Reminders:</h5>
        <ul>
          {reminders.map((r) => (
            <li key={r.id}>
              {r.text} <i>at</i> {r.time}
            </li>
          ))}
        </ul>

        <h5 className="mt-3">🔹 Notes:</h5>
        <ul>
          {notes.map((n) => (
            <li key={n.id}>{n.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenerateReport;
