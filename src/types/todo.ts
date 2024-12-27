export interface Todo {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
}

export type TodoPriority = 'high' | 'medium' | 'low';

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority: TodoPriority;
  dueDate?: Date;
}

export interface UpdateTodoInput extends Partial<CreateTodoInput> {
  isCompleted?: boolean;
}
