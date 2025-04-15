import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = ({ filter, setFilter }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/todos');
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoAdded = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleTodoUpdated = (id, updatedFields) => {
    setTodos(todos.map(todo => 
      todo._id === id ? { ...todo, ...updatedFields } : todo
    ));
  };

  const handleTodoDeleted = (id) => {
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true; // 'all' filter
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="mb-6">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {filter === 'all' 
              ? 'No tasks yet. Add your first task!'
              : filter === 'active'
                ? 'No active tasks'
                : 'No completed tasks'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleTodoUpdated}
              onDelete={handleTodoDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
