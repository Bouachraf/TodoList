import React, { useState } from 'react';
import { FaCheck, FaTrash, FaEdit, FaFlag } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import { format, parseISO } from 'date-fns';

const priorityColors = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500'
};

const priorityIcons = {
  low: <FaFlag className="text-green-500" />,
  medium: <FaFlag className="text-yellow-500" />,
  high: <FaFlag className="text-red-500" />
};

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!editedTitle.trim()) return;

    setIsUpdating(true);
    try {
      const updatedTodo = {
        title: editedTitle,
        description: editedDescription,
        priority: editedPriority,
        dueDate: editedDueDate
      };

      await axios.patch(`http://localhost:5000/api/todos/${todo._id}`, updatedTodo);
      onUpdate(todo._id, updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleComplete = async () => {
    try {
      const updatedTodo = { completed: !todo.completed };
      await axios.patch(`http://localhost:5000/api/todos/${todo._id}`, updatedTodo);
      onUpdate(todo._id, updatedTodo);
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className={`taskwave-card mb-4 ${todo.completed ? 'bg-gray-50' : ''}`}>
      
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            className="taskwave-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="taskwave-input"
            rows="3"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="taskwave-input"
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <DatePicker
              selected={editedDueDate}
              onChange={(date) => setEditedDueDate(date)}
              minDate={new Date()}
              placeholderText="Select a date"
              className="taskwave-input w-full"
              dateFormat="MMMM d, yyyy"
              isClearable
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="taskwave-btn taskwave-btn-primary flex-1"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="taskwave-btn bg-gray-300 text-gray-700 flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <button
                onClick={handleComplete}
                className={`mr-3 p-1 rounded-full ${todo.completed ? 'bg-taskwave-secondary text-white' : 'border border-gray-300'}`}
              >
                <FaCheck size={12} />
              </button>
              <div>
                <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-taskwave-primary hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex items-center">
              {priorityIcons[todo.priority]}
              <span className={`ml-1 ${priorityColors[todo.priority]}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            </div>
            {todo.dueDate && (
              <div className={`text-sm ${new Date(todo.dueDate) < new Date() && !todo.completed ? 'text-red-500' : 'text-gray-500'}`}>
                Due: {format(parseISO(todo.dueDate), 'MMM d, yyyy')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;