import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';

type TaskSortSearchProps = {
  onSort: (criteria: string) => void;
  onSearch: (query: string) => void;
};

const TaskSortSearch: React.FC<TaskSortSearchProps> = ({ onSort, onSearch }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <Input clearable bordered placeholder="Search tasks" onChange={(e) => onSearch(e.target.value)} />
      <Select onChange={(e) => onSort(e.target.value)}>
        <SelectItem key="title" value="title">Title</SelectItem>
        <SelectItem key="dueDate" value="dueDate">Due Date</SelectItem>
      </Select>
    </div>
  );
};

export default TaskSortSearch;