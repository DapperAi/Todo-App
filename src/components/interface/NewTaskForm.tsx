import React, { useState } from 'react';
import { Button, Input, Select } from '@nextui-org/react';

// NewTaskForm allows users to create a new task with a title, description, and status
const NewTaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
        <Select.Option value="To Do">To Do</Select.Option>
        <Select.Option value="In Progress">In Progress</Select.Option>
        <Select.Option value="Done">Done</Select.Option>
      </Select>
      <Button auto type="submit">Create Task</Button>
    </form>
  );
};

export default NewTaskForm;