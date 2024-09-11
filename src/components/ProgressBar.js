import React from 'react';

function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar">
      <p>Question {current} of {total}</p>
      <div className="progress">
        <div
          className="progress-inner"
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
} 

export default ProgressBar;
