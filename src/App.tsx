import React, { useState, useEffect } from 'react';
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from './utils/localStorageUtils';
import { Button, Tooltip } from '@nextui-org/react';

import NewTaskForm from './components/interface/NewTaskForm';
import TaskList from './components/interface/TaskList';
import TaskFilter from './components/interface/TaskFilter';
import UserAuth from './components/interface/UserAuth';

export interface Task {
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: Date | null;
  reminder: boolean;
}
// Example usage of the components, actual implementation will require state management

const App = () => {
  const [filter, setFilter] = useState<string>('All');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = loadTasksFromLocalStorage();
    return savedTasks ? savedTasks : [];
  });

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
  };

  const updateTaskStatus = (index: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task: Task, taskIndex: number) =>
        index === taskIndex ? { ...task, status: task.status === 'To Do' ? 'In Progress' : task.status === 'In Progress' ? 'Done' : 'To Do' } : task
      )
    );
  };
  
  const deleteTask = (index: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter((_, taskIndex) => index !== taskIndex)
    );
  };


  return (
    <div className="p-4 flex flex-col gap-4">
      {!isAuthenticated ? (
        <UserAuth onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div>
          <NewTaskForm onSubmit={addTask} />
          <TaskFilter value={filter} onChange={(e) => setFilter(e.target.value)} />
          <TaskList tasks={tasks.filter(task => filter === 'All' || task.status === filter)} onUpdate={updateTaskStatus} onDelete={deleteTask} />
          <div className="flex justify-end mt-4">
          <Tooltip content="Logout" placement="bottom" >
            <Button color="warning" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </Tooltip>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
