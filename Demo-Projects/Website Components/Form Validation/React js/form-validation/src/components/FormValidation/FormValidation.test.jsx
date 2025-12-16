import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormValidation } from './index';

describe('FormValidation (React)', () => {
  test('renders and is invalid initially', () => {
    render(<FormValidation />);
    const submit = screen.getByRole('button', { name: /send message/i });
    expect(submit).toBeDisabled();
  });

  test('shows errors on invalid submit', async () => {
    render(<FormValidation />);
    const submit = screen.getByRole('button', { name: /send message/i });
    await userEvent.click(submit);
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  test('password mismatch error', async () => {
    render(<FormValidation />);
    await userEvent.type(screen.getByLabelText(/password/i), 'abc12345');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'abc1234x');
    // blur to trigger touched
    await userEvent.tab();
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test('submits when valid', async () => {
    render(<FormValidation />);
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/^email$/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/phone number/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'abc12345');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'abc12345');

    const submit = screen.getByRole('button', { name: /send message/i });
    expect(submit).toBeEnabled();
    await userEvent.click(submit);

    expect(await screen.findByText(/form submitted/i)).toBeInTheDocument();
  });
});
