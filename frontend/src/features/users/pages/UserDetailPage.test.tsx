import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserDetailPage from './UserDetailPage';
import useUsers from '../hooks/useUsers';
import type { User } from '../types';

// Mock Router Params and Navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: 'user-123' }),
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

const mockUserWithAddress: User = {
  id: 'user-123',
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
};

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

describe('UserDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading spinner when loading and selectedUser is null', () => {
    // Arrange
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      loading: true,
    });

    // Act
    render(<UserDetailPage />);

    // Assert
    expect(screen.getByText('Fetching user details profile...')).toBeInTheDocument();
  });

  it('should render profile and addresses successfully', () => {
    // Arrange
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      selectedUser: mockUserWithAddress,
    });

    // Act
    render(<UserDetailPage />);

    // Assert Profile Info is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

    // Assert Address Info is rendered
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Metropolis, NY')).toBeInTheDocument();
  });

  it('should open UserFormDialog when Edit Profile button is clicked', () => {
    // Arrange
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      selectedUser: mockUserWithAddress,
    });
    render(<UserDetailPage />);

    // Assert dialog is closed initially (title not visible in DOM)
    expect(screen.queryByText('Edit User Profile')).not.toBeInTheDocument();

    // Act - click edit
    const editBtn = screen.getByRole('button', { name: /edit profile/i });
    fireEvent.click(editBtn);

    // Assert dialog opens
    expect(screen.getByText('Edit User Profile')).toBeInTheDocument();
  });

  it('should open AddressFormDialog when Add Address button is clicked', () => {
    // Arrange
    vi.mocked(useUsers).mockReturnValue({
      ...defaultHookReturnValue,
      selectedUser: mockUserWithAddress,
    });
    render(<UserDetailPage />);

    // Act - click add address
    const addAddressBtn = screen.getByRole('button', { name: /add address/i });
    fireEvent.click(addAddressBtn);

    // Assert
    expect(screen.getByText('Add New Address')).toBeInTheDocument();
  });
});
