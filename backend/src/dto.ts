export interface Task {
  validate(): boolean;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: Date | null;
  reminder: boolean;
}

export class UserTask implements Task {
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: Date;
  reminder: boolean;
  constructor(t: Task) {
    this.title = t.title;
    this.description = t.description;
    this.status = t.status;
    this.dueDate = t.dueDate;
    this.reminder = t.reminder;
  }

  validate(): boolean {
    if (this.title === undefined || this.title === '') {
      return false;
    }
    if (this.description === undefined || this.description === '') {
      return false;
    }
    if (this.status === undefined) {
      return false;
    }
    if (this.dueDate === undefined) {
      return false;
    }
    return true;
  }
}
