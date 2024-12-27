'use client';

import { useState } from 'react';
import { TodoProvider } from '@/contexts/TodoContext';
import TodoList from '@/components/todo/TodoList';
import TodoForm from '@/components/todo/TodoForm';
import TodoFilter from '@/components/todo/TodoFilter';
import { TodoPriority } from '@/types/todo';

export default function Home() {
  const [filter, setFilter] = useState({
    status: 'all' as 'all' | 'active' | 'completed',
    priority: 'all' as TodoPriority | 'all',
  });

  return (
    <TodoProvider>
      <main className="mx-auto max-w-4xl p-4">
        <h1 className="mb-8 text-center text-3xl font-bold">Todo 앱</h1>
        <div className="space-y-6">
          <TodoForm />
          <TodoFilter
            status={filter.status}
            priority={filter.priority}
            onStatusChange={(status) => setFilter((prev) => ({ ...prev, status }))}
            onPriorityChange={(priority) => setFilter((prev) => ({ ...prev, priority }))}
          />
          <TodoList filter={filter} />
        </div>
      </main>
    </TodoProvider>
  );
}
