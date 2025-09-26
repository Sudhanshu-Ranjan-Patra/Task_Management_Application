import React from "react";

const Stats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;

  return (
    <div className="card mb-4 flex gap-4">
      <div>
        <div className="text-sm text-gray-500">Total</div>
        <div className="text-2xl font-semibold">{total}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Completed</div>
        <div className="text-2xl font-semibold text-green-600">{completed}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Pending</div>
        <div className="text-2xl font-semibold text-yellow-600">{pending}</div>
      </div>
    </div>
  );
};

export default Stats;
