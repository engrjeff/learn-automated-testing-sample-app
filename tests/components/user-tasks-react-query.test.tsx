import { UserTasksReactQuery } from '@/components/user-tasks-react-query';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { db } from '../mocks/db';
import { server } from '../mocks/server';
import { Providers } from './Providers';

describe('UserTasks React Query', () => {
  const taskIds: string[] = [];

  beforeEach(() => {
    [1, 2, 3].forEach(() => {
      const task = db.task.create();
      taskIds.push(task.id);
    });
  });

  afterAll(() => {
    db.task.deleteMany({ where: { id: { in: taskIds } } });
  });

  it('should render the list of user tasks', async () => {
    render(<UserTasksReactQuery />, { wrapper: Providers });

    const items = await screen.findAllByRole('listitem');

    expect(items.length).toBeGreaterThan(0);
  });

  it('should render No tasks when no task is returned', async () => {
    server.use(http.get('/tasks', () => HttpResponse.json([])));

    render(<UserTasksReactQuery />, { wrapper: Providers });

    const message = await screen.findByText(/no tasks/i);

    expect(message).toBeInTheDocument();
  });

  it('should render an error message when error is thrown', async () => {
    server.use(
      http.get('/tasks', () =>
        HttpResponse.json({ message: 'Server Error' }, { status: 500 })
      )
    );

    render(<UserTasksReactQuery />, { wrapper: Providers });

    const errorMessage = await screen.findByText(/error/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a loading UI while fetching the tasks', async () => {
    server.use(
      http.get('/tasks', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<UserTasksReactQuery />, { wrapper: Providers });

    const loading = await screen.findByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });

  it('should remove the loading UI after fetching the tasks', async () => {
    render(<UserTasksReactQuery />, { wrapper: Providers });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it('should remove the loading UI if fetching fails', async () => {
    server.use(
      http.get('/tasks', () =>
        HttpResponse.json({ message: 'Server Error' }, { status: 500 })
      )
    );

    render(<UserTasksReactQuery />, { wrapper: Providers });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
