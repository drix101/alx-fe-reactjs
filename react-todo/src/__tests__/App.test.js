import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders the initial todos', () => {
  render(<App />);
  expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
  expect(screen.getByText(/Build a Todo App/i)).toBeInTheDocument();
  expect(screen.getByText(/Write Tests/i)).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add a new todo/i);
  const button = screen.getByRole('button', { name: /Add Todo/i });

  fireEvent.change(input, { target: { value: 'New Test Todo' } });
  fireEvent.click(button);

  expect(screen.getByText(/New Test Todo/i)).toBeInTheDocument();
});

test('toggles a todo as completed', () => {
  render(<App />);
  const todoItem = screen.getByText(/Learn React/i);

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: line-through');

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: none');
});

test('deletes a todo', () => {
  render(<App />);
  const todoItem = screen.getByText(/Learn React/i);
  const deleteButton = todoItem.parentNode.querySelector('button');

  fireEvent.click(deleteButton);
  expect(todoItem).not.toBeInTheDocument();
});