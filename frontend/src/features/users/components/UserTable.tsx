import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import type { User } from '../types';

interface UserTableProps {
  users: User[];
  onViewDetails: (id: string) => void;
}

/**
 * Reusable table component displaying a structured list of Users.
 */
export const UserTable: React.FC<UserTableProps> = ({ users, onViewDetails }) => {
  return (
    <TableContainer component={Paper} className="bg-[#172a45] border border-white/5 rounded-lg overflow-hidden">
      <Table aria-label="users table">
        <TableHead className="bg-[#233554]">
          <TableRow>
            <TableCell className="font-semibold text-white">Name</TableCell>
            <TableCell className="font-semibold text-white">Email</TableCell>
            <TableCell className="font-semibold text-white" align="center">Addresses</TableCell>
            <TableCell className="font-semibold text-white" align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id} 
              className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
            >
              <TableCell className="text-white font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell className="text-slate-300">{user.email}</TableCell>
              <TableCell className="text-slate-300" align="center">
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
