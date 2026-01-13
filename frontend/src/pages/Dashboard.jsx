import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    'in-progress': [],
    completed: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      const allTasks = response.data.data;

      const groupedTasks = {
        pending: allTasks.filter((task) => task.status === 'pending'),
        'in-progress': allTasks.filter((task) => task.status === 'in-progress'),
        completed: allTasks.filter((task) => task.status === 'completed'),
      };

      setTasks(groupedTasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
    setLoading(false);
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      toast.success('Task created successfully!');
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskAPI.updateTask(selectedTask._id, taskData);
      toast.success('Task updated successfully!');
      setIsModalOpen(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        toast.success('Task deleted successfully!');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const draggedTask = sourceColumn.find((task) => task._id === draggableId);

    if (!draggedTask) return;

    // Update local state
    const newSourceTasks = Array.from(sourceColumn);
    newSourceTasks.splice(source.index, 1);

    const newDestTasks = Array.from(destColumn);
    const updatedTask = { ...draggedTask, status: destination.droppableId };
    newDestTasks.splice(destination.index, 0, updatedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: newSourceTasks,
      [destination.droppableId]: newDestTasks,
    });

    // Update backend
    try {
      await taskAPI.updateTask(draggableId, {
        status: destination.droppableId,
      });
      toast.success('Task status updated!');
    } catch (error) {
      toast.error('Failed to update task status');
      fetchTasks(); // Revert on error
    }
  };

  const columns = [
    { id: 'pending', title: 'Pending', color: 'bg-yellow-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Task Board</h1>
          <button
            onClick={() => {
              setSelectedTask(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            + New Task
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map((column) => (
              <div key={column.id} className={`${column.color} p-4 rounded-lg`}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {column.title} ({tasks[column.id].length})
                </h2>
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[400px] ${
                        snapshot.isDraggingOver ? 'bg-gray-200' : ''
                      } transition-colors duration-200 rounded-lg p-2`}
                    >
                      {tasks[column.id].map((task, index) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          index={index}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={selectedTask ? handleUpdateTask : handleCreateTask}
          task={selectedTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;