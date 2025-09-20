import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Stats from "../components/Stats";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { items: tasks, loading } = useSelector((s) => s.tasks);
  const { user } = useSelector((s) => s.auth);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <div className="container mt-6 px-30 ml-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Hello, {user?.name}</h1>
          <p className="text-sm text-gray-600">Manage your tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-2 rounded bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <Stats tasks={tasks} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-start p-6">
        <TaskForm
          editingTask={editingTask}
          clearEditing={() => setEditingTask(null)}
        />
        {loading ? (
          <div className="card">Loading tasks...</div>
        ) : (
          <TaskList tasks={tasks} setEditing={setEditingTask} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
