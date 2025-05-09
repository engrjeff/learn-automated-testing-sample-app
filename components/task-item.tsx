'use client';

import { CircleCheckIcon, TrashIcon } from 'lucide-react';
import * as React from 'react';
import { Task, useTasks } from './tasks-context-provider';
import { Button } from './ui/button';
import { Card, CardHeader } from './ui/card';

export function TaskItem({ task }: { task: Task }) {
  const { removeTask, toggleTask } = useTasks();

  const [isCompleted, setIsCompleted] = React.useState(() => task.completed);

  return (
    <Card className="hover:border-primary group">
      <CardHeader className="flex-row space-y-0 gap-3 items-center">
        {task.completed ? (
          <CircleCheckIcon className="size-4 text-primary shrink-0" />
        ) : (
          <input
            type="checkbox"
            id={task.id}
            name={task.id}
            data-testid={task.id + '-checkbox'}
            className="size-4 accent-primary hover:accent-primary shrink-0"
            checked={task.completed || isCompleted}
            onChange={(e) => {
              setIsCompleted(e.currentTarget.checked);
              toggleTask(task.id);
            }}
          />
        )}
        <label
          htmlFor={task.id}
          data-testid={task.id + '-label'}
          className="flex items-center select-none cursor-pointer"
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <p className="line-clamp-1">{task.title}</p>
        </label>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto shrink-0 group-hover:opacity-100 opacity-0 transition-opacity duration-200"
          aria-label="delete task"
          title="delete this task"
          data-testid={task.id + '-delete-btn'}
          onClick={() => removeTask(task.id)}
        >
          <TrashIcon />
        </Button>
      </CardHeader>
    </Card>
  );
}
