// <<<<<<< HEAD

// const Task = require('../models/Task');

// // @desc    Get all tasks for logged in user
// =======
// >>>>>>> 68888c7 (Initial commit: frontend and backend with README and env example)
const Task = require('../models/Task');

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const task = new Task({
      user: req.user._id,
      title,
      description,
      status: status || 'pending',
      due_date,
    });

    const createdTask = await task.save();

    res.status(201).json({ success: true, data: createdTask });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    const { title, description, status, due_date } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (due_date !== undefined) task.due_date = due_date;

    const updatedTask = await task.save();
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// const deleteTask = async (req, res, next) => {
//   try {
//     const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
//     if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
//     await task.remove();
//     res.status(200).json({ success: true, message: 'Task removed' });
//   } catch (error) {
//     next(error);
//   }
// };
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    await Task.findByIdAndDelete(task._id);
    res.status(200).json({ success: true, message: 'Task removed' });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
