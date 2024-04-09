// Utility functions for localStorage operations

import { Task } from "../dto";

export const getTasksInBackend = async (): Promise<string | null> => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  if (data.success === true) {
    return data.tasks;
  }
  return null;
}

export const updateTasksInBackend = async (tasks: Task[]) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/update-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ tasks: tasks }),
  });
  return response.json();
};