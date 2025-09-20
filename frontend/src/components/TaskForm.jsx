import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../store/taskSlice";

const TaskForm = ({ editingTask, clearEditing }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "",
        priority: editingTask.priority || "medium",
      });
    } else {
      setForm({ title: "", description: "", dueDate: "", priority: "medium" });
    }
  }, [editingTask]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title required");
    if (editingTask) {
      dispatch(updateTask({ id: editingTask._id, payload: { ...form } }));
      clearEditing();
    } else {
      dispatch(createTask({ ...form }));
    }
    setForm({ title: "", description: "", dueDate: "", priority: "medium" });
  };

  return (
    <div className="card mb-6 p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        {editingTask ? "✏️ Edit Task" : "➕ Add Task"}
      </h3>

      <form onSubmit={submit} className="space-y-4">
        {/* Title */}
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Task Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Description */}
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Extra checkbox text */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.special || false}
            onChange={(e) => setForm({ ...form, special: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-gray-700 text-sm">
            Choose time and importance level for this task
          </label>
        </div>

        {/* Date + Time + Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="date"
            value={form.dueDate || ""}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="time"
            value={form.dueTime || ""}
            onChange={(e) => setForm({ ...form, dueTime: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            type="submit"
          >
            {editingTask ? "Save Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={clearEditing}
              className="p-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
