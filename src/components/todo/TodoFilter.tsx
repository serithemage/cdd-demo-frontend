import Select from '../ui/Select';
import { TodoPriority } from '@/types/todo';

interface TodoFilterProps {
  status: 'all' | 'active' | 'completed';
  priority: TodoPriority | 'all';
  onStatusChange: (status: 'all' | 'active' | 'completed') => void;
  onPriorityChange: (priority: TodoPriority | 'all') => void;
}

const statusOptions = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

const priorityOptions = [
  { value: 'all', label: '전체' },
  { value: 'high', label: '높음' },
  { value: 'medium', label: '중간' },
  { value: 'low', label: '낮음' },
];

const TodoFilter = ({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: TodoFilterProps) => {
  return (
    <div className="flex gap-4">
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as 'all' | 'active' | 'completed')}
        options={statusOptions}
        label="상태"
        fullWidth
      />
      <Select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as TodoPriority | 'all')}
        options={priorityOptions}
        label="우선순위"
        fullWidth
      />
    </div>
  );
};

export default TodoFilter;
