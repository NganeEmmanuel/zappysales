import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddressFormDialog from './AddressFormDialog';
import type { Address } from '../types';

describe('AddressFormDialog', () => {
  it('should render form with empty values in create mode', () => {
    // Arrange & Act
    render(
      <AddressFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        address={null}
        loading={false}
      />
    );

    // Assert
    expect(screen.getByText('Add New Address')).toBeInTheDocument();
    expect(screen.getByLabelText(/street address/i)).toHaveValue('');
    expect(screen.getByLabelText(/city/i)).toHaveValue('');
    expect(screen.getByLabelText(/state \/ province/i)).toHaveValue('');
    expect(screen.getByLabelText(/country/i)).toHaveValue('');
    expect(screen.getByLabelText(/postal code/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('should prepopulate fields in edit mode', () => {
    // Arrange
    const address: Address = {
      id: 'addr-1',
      street: '123 Fake St',
      city: 'Shelbyville',
      state: 'IL',
      country: 'USA',
      postalCode: '62705',
    };

    // Act
    render(
      <AddressFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        address={address}
        loading={false}
      />
    );

    // Assert
    expect(screen.getByText('Edit Address')).toBeInTheDocument();
    expect(screen.getByLabelText(/street address/i)).toHaveValue('123 Fake St');
    expect(screen.getByLabelText(/city/i)).toHaveValue('Shelbyville');
    expect(screen.getByLabelText(/state \/ province/i)).toHaveValue('IL');
    expect(screen.getByLabelText(/country/i)).toHaveValue('USA');
    expect(screen.getByLabelText(/postal code/i)).toHaveValue('62705');
    expect(screen.getByRole('button', { name: /save/i })).not.toBeDisabled();
  });

  it('should validate inputs correctly, disable save button, and display helper texts accordingly', () => {
    // Arrange
    render(
      <AddressFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        address={null}
        loading={false}
      />
    );
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();

    // Act & Assert - Set values one by one
    fireEvent.change(screen.getByLabelText(/street address/i), { target: { value: '123 Fake St' } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Shelbyville' } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/state \/ province/i), { target: { value: 'IL' } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'USA' } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '62705' } });
    expect(saveButton).not.toBeDisabled();

    // Make street exceed 150 characters
    fireEvent.change(screen.getByLabelText(/street address/i), { target: { value: 'a'.repeat(151) } });
    expect(saveButton).toBeDisabled();
    expect(screen.getByText('Street address must not exceed 150 characters')).toBeInTheDocument();

    // Reset street and make city exceed 100 characters
    fireEvent.change(screen.getByLabelText(/street address/i), { target: { value: '123 Fake St' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'b'.repeat(101) } });
    expect(saveButton).toBeDisabled();
    expect(screen.getByText('City name must not exceed 100 characters')).toBeInTheDocument();

    // Reset city and make state exceed 100 characters
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Shelbyville' } });
    fireEvent.change(screen.getByLabelText(/state \/ province/i), { target: { value: 'c'.repeat(101) } });
    expect(saveButton).toBeDisabled();
    expect(screen.getByText('State/Province must not exceed 100 characters')).toBeInTheDocument();

    // Reset state and make country exceed 100 characters
    fireEvent.change(screen.getByLabelText(/state \/ province/i), { target: { value: 'IL' } });
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'd'.repeat(101) } });
    expect(saveButton).toBeDisabled();
    expect(screen.getByText('Country name must not exceed 100 characters')).toBeInTheDocument();

    // Reset country and make postal code exceed 20 characters
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: 'e'.repeat(21) } });
    expect(saveButton).toBeDisabled();
    expect(screen.getByText('Postal code must not exceed 20 characters')).toBeInTheDocument();
  });

  it('should invoke onSave callback with correct payload when form is submitted', () => {
    // Arrange
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(
      <AddressFormDialog
        open={true}
        onClose={vi.fn()}
        onSave={onSave}
        address={null}
        loading={false}
      />
    );

    // Act
    fireEvent.change(screen.getByLabelText(/street address/i), { target: { value: '123 Fake St' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Shelbyville' } });
    fireEvent.change(screen.getByLabelText(/state \/ province/i), { target: { value: 'IL' } });
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '62705' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).not.toBeDisabled();
    fireEvent.click(saveButton);

    // Assert
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      street: '123 Fake St',
      city: 'Shelbyville',
      state: 'IL',
      country: 'USA',
      postalCode: '62705',
    });
  });
});
