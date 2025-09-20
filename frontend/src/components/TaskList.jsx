import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../store/taskSlice';

const TaskList = ({ tasks, setEditing }) => {
  const dispatch = useDispatch();

  const toggleStatus = (task) => {
    dispatch(updateTask({ id: task._id, payload: { status: task.status === 'pending' ? 'completed' : 'pending' } }));
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 && <div className="card">No tasks yet. Add your first task!</div>}
      {tasks.map(t => (
        <div key={t._id} className="card flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={t.status === 'completed'} onChange={() => toggleStatus(t)} />
              <div>
                <div className={`font-semibold ${t.status === 'completed' ? 'line-through text-gray-400' : ''}`}>{t.title}</div>
                <div className="text-sm text-gray-600">{t.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {t.priority} • {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No due date'}
                </div>
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
