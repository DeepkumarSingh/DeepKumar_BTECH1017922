const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a task description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    due_date: {
      type: Date,
      required: [true, 'Please provide a due date'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
taskSchema.index({ user: 1, status: 1 });

taskSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    if (ret.createdAt) ret.created_at = ret.createdAt;
    if (ret.updatedAt) ret.updated_at = ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Task', taskSchema);