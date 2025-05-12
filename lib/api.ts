import { Task } from '@/components/tasks-context-provider';

const url = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(url + '/tasks');

  if (response.status !== 200) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  const tasks = await response.json();

  return tasks;
}
