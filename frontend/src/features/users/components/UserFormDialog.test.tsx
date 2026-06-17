import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserFormDialog from './UserFormDialog';
import type { User } from '../types';

describe('UserFormDialog', () => {
  it('should render in create mode with empty fields and the email field visible', () => {
    // Arrange & Act
    render(
      <UserFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        user={null}
        loading={false}
      />
    );

    // Assert
    expect(screen.getByText('Create User Profile')).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('should render in edit mode prepopulating user data and hiding the email field', () => {
    // Arrange
    const existingUser: User = {
      id: '123',
      firstName: 'Bob',
      lastName: 'Marley',
      email: 'bob.marley@example.com',
      addresses: [],
    };

    // Act
    render(
      <UserFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        user={existingUser}
        loading={false}
      />
    );

    // Assert
    expect(screen.getByText('Edit User Profile')).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toHaveValue('Bob');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Marley');
    expect(screen.queryByLabelText(/email address/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).not.toBeDisabled();
  });

  it('should disable the save button when inputs are invalid', () => {
    // Arrange
    render(
      <UserFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        user={null}
        loading={false}
      />
    );
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();

    // Act & Assert - Set first name and last name
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    expect(saveButton).toBeDisabled(); // Email is still missing/invalid

    // Set invalid email format
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email' } });
    expect(saveButton).toBeDisabled();

    // Set valid email
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john.doe@example.com' } });
    expect(saveButton).not.toBeDisabled();

    // Make first name exceed 50 characters
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'a'.repeat(51) } });
    expect(saveButton).toBeDisabled();
  });

  it('should invoke onSave callback with correct payload when form is valid and submitted', () => {
    // Arrange
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(
      <UserFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={onSave}
        user={null}
        loading={false}
      />
    );

    // Act
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john.doe@example.com' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).not.toBeDisabled();
    fireEvent.click(saveButton);

    // Assert
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
  });
});
