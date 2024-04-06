import React from 'react';
import { Button } from '@nextui-org/react';

type Task = {
  title: string;
  description: string;
  status: string;
};
type TaskListProps = { tasks: Task[]; onUpdate: (index: number) => void; onDelete: (index: number) => void; };

// TaskList displays a list of tasks with options to update status or delete
const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div key={index} className="flex justify-between items-center p-4 border rounded">
          <div>
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <span>Status: {task.status}</span>
          </div>
          <div className="flex space-x-2">
            <Button color="secondary" onClick={() => onUpdate(index)}>Update Status</Button>
            <Button color="danger" onClick={() => onDelete(index)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;