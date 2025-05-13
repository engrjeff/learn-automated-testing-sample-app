import { UserTasksMSW } from '@/components/user-tasks-msw';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
};

function PlaygroundPage() {
  return (
    <div>
      <h1 className="text-lg font-bold">Playground</h1>
      <div>
        <UserTasksMSW />
      </div>
    </div>
  );
}

export default PlaygroundPage;
