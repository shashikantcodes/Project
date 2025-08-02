// src/utils/activityStorage.js

const STORAGE_KEY = "dashboard_activity_history";

// Get stored activity history
export const getActivityHistory = () => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

// Add new activity with timestamp
export const addActivity = (activityMessage) => {
  const history = getActivityHistory();
  const timestamp = new Date().toLocaleString();
  const entry = `${activityMessage} — ${timestamp}`;
  const updatedHistory = [entry, ...history.slice(0, 49)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

  // Optional: Notify others (like RecentActivity component)
  window.dispatchEvent(new Event("storage"));
};
