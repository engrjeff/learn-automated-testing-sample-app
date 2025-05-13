'use client';

import { apiClient } from '@/lib/api-client';
import { AxiosError } from 'axios';
import * as React from 'react';
import { Task } from './tasks-context-provider';

export function UserTasksMSW() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    async function getTasks() {
      try {
        const response = await apiClient.get<Task[]>('/tasks');
        setTasks(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        } else {
          setError('Server Error');
        }
      } finally {
        setIsLoading(false);
      }
    }

    getTasks();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  if (tasks.length === 0) return <p>No tasks to display.</p>;

  return (
    <ul>
      {tasks.map((task) => (
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
