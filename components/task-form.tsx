'use client';

import { useTasks } from './tasks-context-provider';
import { Button } from './ui/button';
import { Input } from './ui/input';

import * as React from 'react';

export function TaskForm() {
  const [taskTitle, setTaskTitle] = React.useState('');

  const titleInputRef = React.useRef<HTMLInputElement | null>(null);

  const { addTask, error, clearError } = useTasks();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskTitle) return;

    if (taskTitle.trim() === '') return;

    const isOk = addTask(taskTitle);

    if (isOk) {
      setTaskTitle('');

      titleInputRef.current?.focus();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={clearError}
      data-testid="task-form"
      aria-describedby={error ? 'task-form-error' : undefined}
      className="border-b pb-6"
    >
      <fieldset className="flex items-center gap-2">
        <label
          htmlFor="task-title"
          className="sr-only"
          data-testid="task-label"
        >
          Task Title
        </label>
        <Input
          ref={titleInputRef}
          id="task-title"
          name="task-title"
          data-testid="task-title-input"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!taskTitle}
          data-testid="task-submit-btn"
        >
          Add Task
        </Button>
      </fieldset>
      {error && (
        <p
          className="text-red-500 text-sm mt-2"
          data-testid="task-form-error"
          id="task-form-error"
        >
          {error}
        </p>
      )}
    </form>
  );
}
