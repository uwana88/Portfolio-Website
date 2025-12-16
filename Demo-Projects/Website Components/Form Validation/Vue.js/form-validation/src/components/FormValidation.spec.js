import { render, fireEvent } from '@testing-library/vue';
import FormValidation from './FormValidation.vue';
import { describe, it, expect } from 'vitest';

describe('FormValidation.vue', () => {
  it('renders and is invalid initially', () => {
    const { getByRole } = render(FormValidation);
    const btn = getByRole('button', { name: /send message/i });
    expect(btn).toBeDisabled();
  });

  it('shows errors on invalid submit', async () => {
    const { getByRole, findByText } = render(FormValidation);
    const btn = getByRole('button', { name: /send message/i });
    await fireEvent.click(btn);
    expect(await findByText(/name is required/i)).toBeTruthy();
    expect(await findByText(/email is required/i)).toBeTruthy();
  });

  it('shows password mismatch error', async () => {
    const { getByLabelText, findByText } = render(FormValidation);
    const pass = getByLabelText(/password/i);
    const pass_c = getByLabelText(/confirm password/i);
    await fireEvent.update(pass, 'abc12345');
    await fireEvent.update(pass_c, 'abc1234X');
    expect(await findByText(/passwords do not match/i)).toBeTruthy();
  });

  it('submits when valid', async () => {
    const { getByLabelText, getByRole, findByText } = render(FormValidation);
    await fireEvent.update(getByLabelText(/name/i), 'John Doe');
    await fireEvent.update(getByLabelText(/^email$/i), 'john@example.com');
    await fireEvent.update(getByLabelText(/phone number/i), '1234567890');
    await fireEvent.update(getByLabelText(/^password$/i), 'abc12345');
    await fireEvent.update(getByLabelText(/confirm password/i), 'abc12345');
    const btn = getByRole('button', { name: /send message/i });
    expect(btn).toBeEnabled();
    await fireEvent.click(btn);
    expect(await findByText(/form submitted/i)).toBeTruthy();
  });
});
