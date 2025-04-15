import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const newTodo = {
        title,
        description,
        priority,
        dueDate
      };

      const response = await axios.post('http://localhost:5000/api/todos', newTodo);
      onTodoAdded(response.data);
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(null);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <div className="taskwave-card mb-6">
     
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            type="text"
            className="taskwave-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="taskwave-input"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className="taskwave-input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="dueDate">
              Due Date
            </label>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              minDate={new Date()}
              placeholderText="Select a date"
              className="taskwave-input w-full"
              dateFormat="MMMM d, yyyy"
              isClearable
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="taskwave-btn  bg-gray-900 text-white w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    // </div>
  );
};

export default TodoForm;