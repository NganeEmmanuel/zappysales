import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsersPage from './UsersPage';
import useUsers from '../hooks/useUsers';
import type { User } from '../types';

// Mock Router Navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock useUsers hook
vi.mock('../hooks/useUsers');

// Mock AppStore for notifications
const mockShowNotification = vi.fn();
vi.mock('../../../stores/appStore', () => ({
  default: (cb: any) => cb({ showNotification: mockShowNotification }),
  useAppStore: (cb: any) => cb({ showNotification: mockShowNotification }),
}));

const mockUsers: User[] = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    addresses: [],
  },
];

const defaultHookReturnValue = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 0,
  pageSize: 10,
  searchTerm: '',
  totalPages: 0,
  totalElements: 0,
  fetchUsers: vi.fn(),
  fetchUserById: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  clearSelectedUser: vi.fn(),
  addAddress: vi.fn(),
  updateAddress: vi.fn(),
  deleteAddress: vi.fn(),
};

describe('UsersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state spinner', () => {
    // Arrange
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      loading: true,
    });

    // Act
    render(<UsersPage />);

    // Assert
    expect(screen.getByText('Fetching user directory details...')).toBeInTheDocument();
  });

  it('should render empty state when no users are returned', () => {
    // Arrange
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      users: [],
    });

    // Act
    render(<UsersPage />);

    // Assert
    expect(screen.getByText('No Users Registered')).toBeInTheDocument();
    expect(screen.getByText(/It looks like there are no user profiles available/i)).toBeInTheDocument();
  });

  it('should render users successfully in the table', () => {
    // Arrange
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      users: mockUsers,
      totalElements: 1,
      totalPages: 1,
    });

    // Act
    render(<UsersPage />);

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('should call fetchUsers with query on search submit', () => {
    // Arrange
    const fetchUsersSpy = vi.fn();
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      users: mockUsers,
      totalElements: 1,
      totalPages: 1,
      fetchUsers: fetchUsersSpy,
    });

    render(<UsersPage />);

    // Act
    const searchInput = screen.getByPlaceholderText(/search name or email/i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    
    const searchBtn = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchBtn);

    // Assert
    expect(fetchUsersSpy).toHaveBeenCalledWith(0, 10, 'Alice');
  });

  it('should render pagination and trigger page size changes', () => {
    // Arrange
    const fetchUsersSpy = vi.fn();
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      users: mockUsers,
      totalElements: 20,
      totalPages: 2,
      currentPage: 0,
      pageSize: 10,
      fetchUsers: fetchUsersSpy,
    });

    render(<UsersPage />);

    // Assert pagination elements
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByText('1–10 of 20')).toBeInTheDocument();

    // Act - click next page
    const nextPageBtn = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextPageBtn);

    // Assert fetch page 1
    expect(fetchUsersSpy).toHaveBeenCalledWith(1, 10, '');
  });
});
