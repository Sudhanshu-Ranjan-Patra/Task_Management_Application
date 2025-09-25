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
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
    <header className="w-full bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Hello, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-gray-600">Manage your tasks effectively</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    {/* Stats Section */}
    <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 mt-6">
      <Stats tasks={tasks} />
    </section>

    {/* Dashboard Main Content */}
    <main className="flex-1 w-full mt-6 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left Side - Task Form */}
        <aside className="lg:col-span-1">
          <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-20">
            <TaskForm
              editingTask={editingTask}
              clearEditing={() => setEditingTask(null)}
            />
          </div>
        </aside>

        {/* Right Side - Task List */}
        <section className="lg:col-span-2">
          {loading ? (
            <div className="p-6 text-center bg-white rounded-2xl shadow-lg">
              <span className="animate-pulse text-gray-500">
                Loading tasks...
              </span>
            </div>
          ) : (
            <TaskList tasks={tasks} setEditing={setEditingTask} />
          )}
        </section>
      </div>
    </main>

    {/* Footer */}
    <footer className="mt-10 py-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} Task Manager. Built by DearCode.
    </footer>
  </div>
);
};
export default Dashboard;
