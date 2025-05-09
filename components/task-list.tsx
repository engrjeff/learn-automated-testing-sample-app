'use client';

import { CircleCheckIcon, CircleDashedIcon } from 'lucide-react';
import { TaskItem } from './task-item';
import { useTasks } from './tasks-context-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) return <p>No tasks to show. Add one now.</p>;

  const pendingTasks = tasks.filter((task) => !task.completed);

  const finishedTasks = tasks.filter((task) => task.completed);

  return (
    <Tabs defaultValue="pending">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="pending">
          <CircleDashedIcon className="size-4 mr-2" /> Pending
          <span data-testid="pending-count">({pendingTasks.length})</span>
        </TabsTrigger>
        <TabsTrigger value="finished">
          <CircleCheckIcon className="size-4 mr-2" />
          Finished{' '}
          <span data-testid="finished-count">({finishedTasks.length})</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        {pendingTasks.length > 0 ? (
          <ul data-testid="pending-tasks-list" className="space-y-3">
            {pendingTasks.map((task) => (
              <li key={task.id}>
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center">
            You have no pending tasks.
          </p>
        )}
      </TabsContent>
      <TabsContent value="finished">
        {finishedTasks.length > 0 ? (
          <ul data-testid="finished-tasks-list" className="space-y-3">
            {finishedTasks.map((task) => (
              <li key={task.id}>
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center">
            You have no finished tasks yet.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}
