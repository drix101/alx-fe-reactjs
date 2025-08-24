// src/TodoList.jsx

import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;