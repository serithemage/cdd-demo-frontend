import { API } from 'aws-amplify';
import { CreateTodoInput, Todo, UpdateTodoInput } from '@/types/todo';

const API_NAME = 'TodoAPI';

export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await API.get(API_NAME, '/todos', {});
    return response;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

export async function getTodo(todoId: string): Promise<Todo> {
  try {
    const response = await API.get(API_NAME, `/todos/${todoId}`, {});
    return response;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
}

export async function createTodo(todo: CreateTodoInput): Promise<Todo> {
  try {
    const response = await API.post(API_NAME, '/todos', {
      body: todo,
    });
    return response;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

export async function updateTodo(todoId: string, todo: UpdateTodoInput): Promise<void> {
  try {
    await API.put(API_NAME, `/todos/${todoId}`, {
      body: todo,
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

export async function deleteTodo(todoId: string): Promise<void> {
  try {
    await API.del(API_NAME, `/todos/${todoId}`, {});
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}
