import React from 'react';
import NewTaskForm from './components/interface/NewTaskForm';
import TaskList from './components/interface/TaskList';
import TaskFilter from './components/interface/TaskFilter';

function App() {
  return (
  <div></div>
  );
}

// Example usage of the components, actual implementation will require state management
const exampleTasks = [{ title: 'Task 1', description: 'Description 1', status: 'To Do' }];

const App = () => {
  return (
    <div className="p-4">
      <NewTaskForm onSubmit={(task) => console.log(task)} />
      <TaskFilter value="All" onChange={(e) => console.log(e.target.value)} />
      <TaskList tasks={exampleTasks} onUpdate={(index) => console.log('Update', index)} onDelete={(index) => console.log('Delete', index)} />
    </div>
  );
};


export default App;
