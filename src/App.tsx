import React, { useState } from 'react';
import NewTaskForm from './components/interface/NewTaskForm';
import TaskList from './components/interface/TaskList';
import TaskFilter from './components/interface/TaskFilter';

// Example usage of the components, actual implementation will require state management

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
  };

  const updateTaskStatus = (index) => {
    setTasks((currentTasks) =>
      currentTasks.map((task, taskIndex) =>
        index === taskIndex ? { ...task, status: task.status === 'To Do' ? 'In Progress' : task.status === 'In Progress' ? 'Done' : 'To Do' } : task
      )
    );
  };

  return (
    <div className="p-4">
      <NewTaskForm onSubmit={addTask} />
      <TaskFilter value="All" onChange={(e) => console.log(e.target.value)} />
      <TaskList tasks={tasks} onUpdate={updateTaskStatus} onDelete={(index) => console.log('Delete', index)} />
    </div>
  );
};


export default App;
