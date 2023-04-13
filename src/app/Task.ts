
export interface Task {
  id?: number;
  title?: string;
  description?: string;
  hasReminder?: boolean;
  isComplete?: boolean;
  deadline?: Date;
  createdAt: Date;
}
