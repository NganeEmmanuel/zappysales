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

  it('should validate inputs correctly and disable save button accordingly', () => {
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
