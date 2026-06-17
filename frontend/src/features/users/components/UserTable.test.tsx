import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserTable from './UserTable';
import type { User } from '../types';

const mockUsers: User[] = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    addresses: [
      {
        id: 'addr-1',
        street: '123 Main St',
        city: 'Metropolis',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
      },
    ],
  },
  {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    addresses: [],
  },
];

describe('UserTable', () => {
  it('should render a list of users successfully', () => {
    // Arrange
    const onViewDetails = vi.fn();

    // Act
    render(<UserTable users={mockUsers} onViewDetails={onViewDetails} />);

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Address count

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Address count
  });

  it('should render empty table when users list is empty', () => {
    // Arrange
    const onViewDetails = vi.fn();

    // Act
    render(<UserTable users={[]} onViewDetails={onViewDetails} />);

    // Assert
    const rows = screen.queryAllByRole('row');
    // Header row is always present, so rows length should be 1 (just the header)
    expect(rows.length).toBe(1);
  });

  it('should trigger onViewDetails callback when View Details button is clicked', () => {
    // Arrange
    const onViewDetails = vi.fn();
    render(<UserTable users={mockUsers} onViewDetails={onViewDetails} />);

    // Act
    const viewButtons = screen.getAllByRole('button', { name: /view details/i });
    fireEvent.click(viewButtons[0]);

    // Assert
    expect(onViewDetails).toHaveBeenCalledTimes(1);
    expect(onViewDetails).toHaveBeenCalledWith('user-1');
  });
});
