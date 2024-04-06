import React, { useState } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';

type NewTaskFormProps = {
  onSubmit: (task: { title: string; description: string; status: string }) => void;
};

// NewTaskForm allows users to create a new task with a title, description, and status
const NewTaskForm: React.FC<NewTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <Input aria-label="Task Title" isClearable={true} fullWidth color="primary" size="lg" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input aria-label="Task Description" isClearable={true} fullWidth color="primary" size="lg" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select aria-label="Task Status" fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
        <SelectItem key="To Do" value="To Do">To Do</SelectItem>
        <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
        <SelectItem key="Done" value="Done">Done</SelectItem>
      </Select>
      <Button type="submit">Create Task</Button>
    </form>
  );
};

export default NewTaskForm;