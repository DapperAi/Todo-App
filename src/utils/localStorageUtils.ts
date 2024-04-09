// Utility functions for localStorage operations

import { Task } from "../dto";

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = (): Task[] | null => {
  const tasksJSON = localStorage.getItem('tasks');
  if (tasksJSON) {
    return JSON.parse(tasksJSON);
  }
  return null;
};

export const updateTasksInBackend = async (emailId: string, tasks: Task[]) => {
  const response = await fetch('http://localhost:3000/update-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailId: emailId, tasks: tasks }),
  });
  return response.json();
};