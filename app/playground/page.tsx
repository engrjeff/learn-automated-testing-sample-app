import { Providers } from '@/components/providers';
import { UserTasksReactQuery } from '@/components/user-tasks-react-query';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
};

function PlaygroundPage() {
  return (
    <Providers>
      <div>
        <h1 className="text-lg font-bold">Playground</h1>
        <div>
          <UserTasksReactQuery />
        </div>
      </div>
    </Providers>
  );
}

export default PlaygroundPage;
