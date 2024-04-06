import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

type TaskFilterProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

// TaskFilter allows users to filter tasks by status
const TaskFilter: React.FC<TaskFilterProps> = ({ value, onChange }) => {
  return (
    <Select aria-label="Filter Tasks By Status" fullWidth value={value} onChange={onChange} label='task filter'>
      <SelectItem key="All" value="All">All</SelectItem>
      <SelectItem key="To Do" value="To Do">To Do</SelectItem>
      <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
      <SelectItem key="Done" value="Done">Done</SelectItem>
    </Select>
  );
};

export default TaskFilter;