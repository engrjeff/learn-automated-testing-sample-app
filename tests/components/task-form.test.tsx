import { TaskForm } from '@/components/task-form';
import { TaskProvider } from '@/components/tasks-context-provider';
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('task form', () => {
  const renderComponent = () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    return {
      form: screen.getByTestId(/task-form/i),
      button: screen.getByRole('button', { name: /add task/i }),
      input: screen.getByRole('textbox'),
      errorAlert: screen.queryByTestId(/task-form-error/i),
    };
  };

  it('should render the task form', () => {
    const { form } = renderComponent();

    expect(form).toBeInTheDocument();

    // Use `within` to query inside the form only
    const utils = within(form);

    expect(utils.getByRole('textbox')).toBeInTheDocument();
    expect(
      utils.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument();
  });

  it('should display a disabled Add Task button on initial render', () => {
    const { button } = renderComponent();

    expect(button).toBeDisabled();
  });

  it('should not display an error alert if there is no form error', () => {
    const { errorAlert } = renderComponent();

    expect(errorAlert).not.toBeInTheDocument();
  });

  it('should enable the Add Task button if the input is not empty', async () => {
    const { button, input } = renderComponent();

    const user = userEvent.setup();

    await user.type(input, 'new task');

    expect(button).toBeEnabled();
  });
});
