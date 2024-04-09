import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import 'react-datepicker/dist/react-datepicker.css';
import { Task } from '../../dto';

type NewTaskFormProps = {
  onSubmit: (task: Task) => void;
};
// NewTaskForm allows users to create a new task with a title, description, and status
const NewTaskForm: React.FC<NewTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, description, status, dueDate,  reminder});
    setTitle('');
    setDescription('');
    setStatus('To Do'); 
    setDueDate(null); 
    setReminder(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
        <Input aria-label="Task Title" isClearable={true} fullWidth color="primary" size="lg" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input aria-label="Task Description" isClearable={true} fullWidth color="primary" size="lg" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select aria-label="Task Status" fullWidth value={status} onChange={(e) => setStatus(e.target.value)} label="Select status">
          <SelectItem key="To Do" value="To Do">To Do</SelectItem>
          <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
          <SelectItem key="Done" value="Done">Done</SelectItem>
        </Select>
        <Input 
        color='primary'
        label="select the date"
        startContent = {          
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
          />
        }>
        </Input>
        <Checkbox checked={reminder} onChange={(e) => setReminder(e.target.checked)}>Set Reminder</Checkbox>
      <Button type="submit">Create Task</Button>
    </form>
  );
};

export default NewTaskForm;