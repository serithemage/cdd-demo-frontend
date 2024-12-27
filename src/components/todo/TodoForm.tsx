import { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { CreateTodoInput, TodoPriority } from '@/types/todo';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const priorityOptions = [
  { value: 'high', label: '높음' },
  { value: 'medium', label: '중간' },
  { value: 'low', label: '낮음' },
];

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [formData, setFormData] = useState<CreateTodoInput>({
    title: '',
    description: '',
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addTodo(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm">
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="할 일을 입력하세요"
        label="할 일"
        fullWidth
        required
      />
      <Input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="상세 설명을 입력하세요"
        label="설명"
        fullWidth
      />
      <Select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        options={priorityOptions}
        label="우선순위"
        fullWidth
      />
      <Button type="submit" fullWidth>
        추가하기
      </Button>
    </form>
  );
};

export default TodoForm;
