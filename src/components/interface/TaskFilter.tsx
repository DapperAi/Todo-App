import React from 'react';
import { Select } from '@nextui-org/react';

// TaskFilter allows users to filter tasks by status
const TaskFilter = ({ value, onChange }) => {
  return (
    <Select fullWidth value={value} onChange={onChange}>
      <Select.Option value="All">All</Select.Option>
      <Select.Option value="To Do">To Do</Select.Option>
      <Select.Option value="In Progress">In Progress</Select.Option>
      <Select.Option value="Done">Done</Select.Option>
    </Select>
  );
};

export default TaskFilter;