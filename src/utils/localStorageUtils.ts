// Utility functions for localStorage operations

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

interface Task {
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: Date | null;
  reminder: boolean;
}