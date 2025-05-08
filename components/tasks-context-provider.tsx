'use client';

import React from 'react';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskContext {
  tasks: Task[];
  error: string | null;
  addTask: (title: string) => boolean;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearError: () => void;
}

const TasksContext = React.createContext<TaskContext | null>(null);

const initialTasks: Task[] = [
  {
    title: 'Review QA Roadmap (Definitions, theories, and concepts)',
    id: 'task-1',
    completed: false,
    createdAt: new Date().toISOString() + 'task-1',
  },
  {
    title: 'Have a JavaScript refresher or crash course',
    id: 'task-2',
    completed: false,
    createdAt: new Date().toISOString() + 'task-2',
  },
  {
    title: 'Review the basics of HTML and CSS',
    id: 'task-3',
    completed: false,
    createdAt: new Date().toISOString() + 'task-3',
  },
  {
    title: 'Review the basics of web accessibility (WCAG, WAI-ARIA, etc.)',
    id: 'task-4',
    completed: false,
    createdAt: new Date().toISOString() + 'task-4',
  },
  {
    title:
      'Learn about the basics of web performance (Core Web Vitals, speed, etc.)',
    id: 'task-5',
    completed: false,
    createdAt: new Date().toISOString() + 'task-5',
  },
  {
    title:
      'Learn the basics of automated testing (unit tests, integration tests, etc.)',
    id: 'task-6',
    completed: false,
    createdAt: new Date().toISOString() + 'task-6',
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const [error, setError] = React.useState<string | null>(null);

  const addTask = React.useCallback(
    (title: string) => {
      const taskExists = tasks.some(
        (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
      );

      if (taskExists) {
        setError('Task already exists');
        return false;
      }

      const newTask: Task = {
        id: `task-${Date.now().toLocaleString()}`,
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);

      toast.success('Task added successfully');

      return true;
    },
    [tasks]
  );

  function removeTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success('Task removed successfully');
  }

  function toggleTask(id: string) {
    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );

      toast.success('Task status updated successfully');
    }, 1000);
  }

  function clearError() {
    setError(null);
  }

  const contextValue = React.useMemo<TaskContext>(
    () => ({ tasks, error, addTask, removeTask, toggleTask, clearError }),
    [tasks, error, addTask]
  );

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = React.useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }

  return context;
}
