import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import type { User } from '../types';
import styles from './UserTable.module.css';

interface UserTableProps {
  users: User[];
  onViewDetails: (id: string) => void;
}

/**
 * Reusable table component displaying a structured list of Users.
 */
export const UserTable: React.FC<UserTableProps> = ({ users, onViewDetails }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table aria-label="users table">
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell className={styles.headerCell}>Name</TableCell>
            <TableCell className={styles.headerCell}>Email</TableCell>
            <TableCell className={styles.headerCell} align="center">Addresses</TableCell>
            <TableCell className={styles.headerCell} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id} 
              className={styles.tableRow}
            >
              <TableCell className={styles.nameCell}>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell className={styles.textCell}>{user.email}</TableCell>
              <TableCell className={styles.textCell} align="center">
                {user.addresses?.length || 0}
              </TableCell>
              <TableCell align="right">
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
                  onClick={() => onViewDetails(user.id)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
