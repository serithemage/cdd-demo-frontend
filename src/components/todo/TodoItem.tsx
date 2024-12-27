import { Todo } from '@/types/todo';
import { useTodo } from '@/contexts/TodoContext';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

interface TodoItemProps {
  todo: Todo;
}

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600',
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, deleteTodo } = useTodo();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm">
      <Checkbox
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={`text-lg font-medium ${todo.isCompleted ? 'text-gray-500 line-through' : ''}`}>
            {todo.title}
          </h3>
          <span className={`text-sm ${priorityColors[todo.priority]}`}>
            {todo.priority === 'high' ? '높음' : todo.priority === 'medium' ? '중간' : '낮음'}
          </span>
        </div>
        {todo.description && (
          <p className={`mt-1 text-sm text-gray-600 ${todo.isCompleted ? 'line-through' : ''}`}>
            {todo.description}
          </p>
        )}
        <div className="mt-2 flex gap-4 text-sm text-gray-500">
          <span>생성: {formatDate(todo.createdAt)}</span>
          {todo.dueDate && <span>마감: {formatDate(todo.dueDate)}</span>}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteTodo(todo.id)}
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        삭제
      </Button>
    </div>
  );
};

export default TodoItem;
