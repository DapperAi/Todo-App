export type Status = 'To Do' | 'In Progress' | 'Done' | string;

export interface Task {
  title: string;
  description: string;
  status: Status;
  dueDate: Date | null;
  reminder: boolean;
}