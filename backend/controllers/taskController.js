import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      dueDate: dueDate || null,
      status: status || 'pending',
      priority: priority || 'medium'
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (String(task.userId) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

    const updates = (({ title, description, dueDate, status, priority }) => ({ title, description, dueDate, status, priority }))(req.body);

    const updated = await Task.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (String(task.userId) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
