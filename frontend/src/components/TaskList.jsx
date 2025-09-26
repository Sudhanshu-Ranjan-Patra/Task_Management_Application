import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../store/taskSlice";

const TaskList = ({ tasks, setEditing }) => {
  const dispatch = useDispatch();

  const toggleStatus = (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    dispatch(updateTask({ id: task._id, payload: { status: newStatus } }));
  };

  return (
    <div className="space-y-4 px-3 sm:px-6 lg:px-10 py-5">
      {tasks.length === 0 && (
        <div className="p-6 text-center text-gray-600 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-md">
          🚀 No tasks yet. Add your first task!
        </div>
      )}

      {tasks.map((t) => (
        <div
          key={t._id}
          className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white px-5 py-4 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
          {/* Left Side */}
          <div className="flex-1 w-full">
            <div>
              <div
                className={`font-semibold text-base sm:text-lg ${
                  t.status === "completed"
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {t.title}
              </div>
              <div className="text-sm text-gray-600">{t.description}</div>

              {t.status !== "completed" && (
                <button
                  onClick={() => toggleStatus(t)}
                  className="mt-3 px-4 py-1.5 w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors duration-200"
                >
                  ✅ Mark as Completed
                </button>
              )}

              {t.status === "completed" && (
                <button
                  onClick={() => toggleStatus(t)}
                  className="mt-3 px-4 py-1.5 w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs font-medium transition-colors duration-200"
                >
                  ⏳ Mark as Pending
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Edit & Delete */}
          <div className="flex w-full sm:w-auto sm:flex-col gap-2">
            <button
              onClick={() => setEditing(t)}
              className="flex-1 sm:flex-none text-sm px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Delete task?")) dispatch(deleteTask(t._id));
              }}
              className="flex-1 sm:flex-none text-sm px-3 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TaskList;
