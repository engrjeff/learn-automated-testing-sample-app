'use client';

import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Task } from './tasks-context-provider';

async function getTasks() {
  try {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error('Server Error');
    }
  }
}

export function UserTasksReactQuery() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    retry: false, // disable retry
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!tasks?.length) return <p>No tasks to display.</p>;

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.id}>
          <div>
            <h2>{task.title}</h2>
            <p>{task.completed ? 'Completed' : 'To Do'}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
