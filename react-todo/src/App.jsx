import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList.jsx'; // Import the TodoList component

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: true },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const text = e.target.elements.todo.value;
        if (text.trim()) {
          addTodo(text);
          e.target.reset();
        }
      }}>
        <input name="todo" type="text" placeholder="Add a new todo" />
        <button type="submit">Add Todo</button>
      </form>

      {/* The TodoList component is used here,
          and the state and functions are passed as props. */}
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;