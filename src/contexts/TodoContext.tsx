'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CreateTodoInput, Todo, UpdateTodoInput } from '@/types/todo';
import * as api from '@/lib/api';
import { useAuth } from './AuthContext';

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (todo: CreateTodoInput) => Promise<void>;
  updateTodo: (todoId: string, todo: UpdateTodoInput) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
  toggleTodo: (todoId: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadTodos();
    } else {
      setTodos([]);
      setIsLoading(false);
    }
  }, [user]);

  async function loadTodos() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getTodos();
      setTodos(data);
    } catch (error: any) {
      setError(error.message || '할 일을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodo(todo: CreateTodoInput) {
    try {
      setError(null);
      const newTodo = await api.createTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
    } catch (error: any) {
      setError(error.message || '할 일을 추가하는 중 오류가 발생했습니다.');
      throw error;
    }
  }

  async function updateTodo(todoId: string, todo: UpdateTodoInput) {
    try {
      setError(null);
      await api.updateTodo(todoId, todo);
      setTodos((prev) =>
        prev.map((t) => (t.id === todoId ? { ...t, ...todo } : t))
      );
    } catch (error: any) {
      setError(error.message || '할 일을 수정하는 중 오류가 발생했습니다.');
      throw error;
    }
  }

  async function deleteTodo(todoId: string) {
    try {
      setError(null);
      await api.deleteTodo(todoId);
      setTodos((prev) => prev.filter((t) => t.id !== todoId));
    } catch (error: any) {
      setError(error.message || '할 일을 삭제하는 중 오류가 발생했습니다.');
      throw error;
    }
  }

  async function toggleTodo(todoId: string) {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    await updateTodo(todoId, {
      isCompleted: !todo.isCompleted,
    });
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
