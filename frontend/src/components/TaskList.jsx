import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../store/taskSlice';

const TaskList = ({ tasks, setEditing }) => {
  const dispatch = useDispatch();

  // ...existing code...

  return (
    <div className="space-y-3 ml-5">
      {tasks.length === 0 && <div className="card">No tasks yet. Add your first task!</div>}
      {tasks.map(t => (
        <div key={t._id} className="card flex items-start justify-between gap-4 bg-blue-200 px-5 py-3 rounded-2xl">
          <div>
            <div className="flex items-center gap-3">
              {/* Checkbox removed: status feature not needed */}
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-gray-600">{t.description}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={() => setEditing(t)} className="text-sm p-1 rounded border">Edit</button>
            <button onClick={() => { if (confirm('Delete task?')) dispatch(deleteTask(t._id)); }} className="text-sm p-1 rounded border text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
