'use client';

import { fetchTasks } from '@/lib/api';
import * as React from 'react';
import { Task } from './tasks-context-provider';

export function UserTasks() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
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
