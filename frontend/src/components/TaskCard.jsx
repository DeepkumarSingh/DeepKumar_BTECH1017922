import { Draggable } from '@hello-pangea/dnd';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = new Date(task.due_date) < new Date() && task.status !== 'completed';

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-lg shadow-md mb-3 border-l-4 ${
            isOverdue ? 'border-red-500' : 'border-blue-500'
          } ${snapshot.isDragging ? 'shadow-2xl scale-105' : ''} transition-all duration-200`}
        >
          <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">{task.title}</h3>
          <div className="text-xs text-gray-400 mb-2">{`Created: ${formatDate(task.created_at || task.createdAt)}`}</div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
            <span
              className={`text-xs ${
                isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'
              }`}
            >
              Due: {formatDate(task.due_date)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;