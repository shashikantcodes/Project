import React from 'react';
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const userName = "John Doe";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div
          className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center fw-bold"
          style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}
        >
          {firstLetter}
        </div>

        <button className="btn btn-danger px-4 py-2" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>

      <div className="mb-2 fs-5 fw-semibold">Name: {userName}</div>
      <p className="text-muted">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique quis, veritatis sunt laboriosam accusantium enim pariatur, corrupti, dolorem reprehenderit dolorum libero aliquid?
      </p>
    </div>
  );
}

export default User;
