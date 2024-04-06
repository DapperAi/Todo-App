import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

// TaskFilter allows users to filter tasks by status
const TaskFilter = ({ value, onChange }) => {
  return (
    <Select fullWidth value={value} onChange={onChange}>
      <SelectItem key="All" value="All">All</SelectItem>
      <SelectItem key="To Do" value="To Do">To Do</SelectItem>
      <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
      <SelectItem key="Done" value="Done">Done</SelectItem>
    </Select>
  );
};

export default TaskFilter;