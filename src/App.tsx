import  { useState, useEffect } from 'react';
import { updateTasksInBackend, getTasksInBackend } from './utils/localStorageUtils';
import { Button, Tooltip } from '@nextui-org/react';

import NewTaskForm from './components/interface/NewTaskForm';
import TaskList from './components/interface/TaskList';
import TaskFilter from './components/interface/TaskFilter';
import UserAuth from './components/interface/UserAuth';
import { Task } from './dto';
import UserProfile from './components/interface/UserProfile';

const App = () => {
  const [filter, setFilter] = useState<string>('All');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [username, setUsername] = useState<string>('');


  useEffect(() => {
    if(isAuthenticated){
      getTasksInBackend().then(res => {
        if(res) {
          setTasks(JSON.parse(res));
        }
      })
    }
  },[isAuthenticated])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated])

  const addTask = (task: Task) => {
    updateTasksInBackend([...tasks, task]);
    getTasksInBackend();
    setTasks((currentTasks) => [...currentTasks, task]);
  };

  const updateTaskStatus = (index: number) => {
    let updatedTasks : Task[] = []
    setTasks((currentTasks) =>
      {
          updatedTasks = currentTasks.map((task: Task, taskIndex: number) =>
          index === taskIndex ? { ...task, status: task.status === 'To Do' ? 'In Progress' : task.status === 'In Progress' ? 'Done' : 'To Do' } : task
        )
        return updatedTasks;
      }
    );
    updateTasksInBackend(updatedTasks);
  };
  
  const deleteTask = (index: number) => {
    let remianingTasks : Task[] = []
    setTasks((currentTasks) =>
      {
        remianingTasks = currentTasks.filter((_, taskIndex) => index !== taskIndex)
        return remianingTasks;
      }
    );
    updateTasksInBackend(remianingTasks);
  };


  return (
    <div className="p-4 flex flex-col gap-4">
      {!isAuthenticated ? (
        <UserAuth onAuthSuccess={(token: string, username: string) => {
          localStorage.setItem('token', token);
          setIsAuthenticated(true)
          setUsername(username);
        }} />
      ) : (
        <div className='flex flex-col gap-4'>
          <UserProfile username={username}/>
          <NewTaskForm onSubmit={addTask} />
          <TaskFilter value={filter} onChange={(e) => setFilter(e.target.value)} />
          <TaskList tasks={tasks.filter(task => filter === 'All' || task.status === filter)} onUpdate={updateTaskStatus} onDelete={deleteTask} />
          <div className="flex justify-end mt-4">
          <Tooltip content="Logout" placement="bottom" >
            <Button color="warning" onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false)
                }
              }>
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
