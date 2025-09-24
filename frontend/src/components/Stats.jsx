import React from 'react';

const Stats = ({ tasks }) => {
  const total = tasks.length;

  return (
    <div className="card mb-4 flex gap-4">
      <div>
        <div className="text-sm text-gray-500">Total Tasks</div>
        <div className="text-2xl font-semibold">{total}</div>
      </div>
    </div>
  );
};

export default Stats;
