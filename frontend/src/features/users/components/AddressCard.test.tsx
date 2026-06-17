import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddressCard from './AddressCard';
import type { Address } from '../types';

const mockAddress: Address = {
  id: 'addr-1',
  street: '742 Evergreen Terrace',
  city: 'Springfield',
  state: 'IL',
  country: 'USA',
  postalCode: '62704',
};

describe('AddressCard', () => {
  it('should render all address data elements', () => {
    // Arrange & Act
    render(<AddressCard address={mockAddress} />);

    // Assert
    expect(screen.getByText('742 Evergreen Terrace')).toBeInTheDocument();
    expect(screen.getByText('Springfield, IL')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Postal Code: 62704')).toBeInTheDocument();
  });

  it('should invoke onEdit with address object when edit button is clicked', () => {
    // Arrange
    const onEdit = vi.fn();
    render(<AddressCard address={mockAddress} onEdit={onEdit} />);

    // Act
    const editBtn = screen.getByRole('button', { name: /edit address/i });
    fireEvent.click(editBtn);

    // Assert
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(mockAddress);
  });

  it('should invoke onDelete with address id when delete button is clicked', () => {
    // Arrange
    const onDelete = vi.fn();
    render(<AddressCard address={mockAddress} onDelete={onDelete} />);

    // Act
    const deleteBtn = screen.getByRole('button', { name: /delete address/i });
    fireEvent.click(deleteBtn);

    // Assert
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('addr-1');
  });

  it('should not render action buttons when callbacks are omitted', () => {
    // Arrange & Act
    render(<AddressCard address={mockAddress} />);

    // Assert
    expect(screen.queryByRole('button', { name: /edit address/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete address/i })).not.toBeInTheDocument();
  });
});
