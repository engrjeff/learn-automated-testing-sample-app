import { TaskForm } from '@/components/task-form';
import { TaskList } from '@/components/task-list';
import { TaskProvider } from '@/components/tasks-context-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasks',
};

function TasksPage() {
  return (
    <TaskProvider>
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-center text-primary font-bold text-xl">My Tasks</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default TasksPage;
