import { useTodo } from '@/contexts/TodoContext';
import TodoItem from './TodoItem';
import { TodoPriority } from '@/types/todo';

interface TodoListProps {
  filter: {
    status: 'all' | 'active' | 'completed';
    priority: TodoPriority | 'all';
  };
}

const TodoList = ({ filter }: TodoListProps) => {
  const { todos, isLoading, error } = useTodo();

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const filteredTodos = todos.filter((todo) => {
    const statusMatch =
      filter.status === 'all' ||
      (filter.status === 'active' && !todo.isCompleted) ||
      (filter.status === 'completed' && todo.isCompleted);

    const priorityMatch =
      filter.priority === 'all' || todo.priority === filter.priority;

    return statusMatch && priorityMatch;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center text-gray-500">
        할 일이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
