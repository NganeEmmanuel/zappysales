import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserProfileCard from './UserProfileCard';
import type { User } from '../types';

const mockUser: User = {
  id: 'user-123',
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice.johnson@example.com',
  addresses: [],
};

describe('UserProfileCard', () => {
  it('should render the first name, last name, and email address of the user', () => {
    // Arrange & Act
    render(<UserProfileCard user={mockUser} />);

    // Assert
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Johnson')).toBeInTheDocument();
    expect(screen.getByText('alice.johnson@example.com')).toBeInTheDocument();
    expect(screen.getByText('user-123')).toBeInTheDocument();
  });
});
