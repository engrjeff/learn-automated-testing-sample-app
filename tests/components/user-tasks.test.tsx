import { UserTasks } from '@/components/user-tasks';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

import * as api from '@/lib/api';

describe('UserTasks', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the list of user tasks', async () => {
    const mockedTasks = [1, 2, 3].map(() => ({
      id: faker.string.uuid(),
      title: faker.lorem.text(),
      completed: faker.helpers.arrayElement([true, false]),
      createdAt: faker.date.past().toISOString(),
    }));

    const spy = vi.spyOn(api, 'fetchTasks').mockResolvedValue(mockedTasks);

    render(<UserTasks />);

    const items = await screen.findAllByRole('listitem');

    expect(items.length).toBeGreaterThan(0);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it('should render No tasks when no task is returned', async () => {
    const spy = vi.spyOn(api, 'fetchTasks').mockResolvedValue([]);

    render(<UserTasks />);

    const message = await screen.findByText(/no tasks/i);

    expect(message).toBeInTheDocument();
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it('should render an error message when error is thrown', async () => {
    const spy = vi
      .spyOn(api, 'fetchTasks')
      .mockRejectedValue(new Error('Error'));

    render(<UserTasks />);

    const errorMessage = await screen.findByText(/error/i);

    expect(errorMessage).toBeInTheDocument();
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it('should render a loading UI while fetching the tasks', async () => {
    const spy = vi
      .spyOn(api, 'fetchTasks')
      .mockImplementation(() => new Promise(() => {}));

    render(<UserTasks />);

    const loading = await screen.findByText(/loading/i);

    expect(loading).toBeInTheDocument();
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });
});
