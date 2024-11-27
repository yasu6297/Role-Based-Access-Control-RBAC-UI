// src/components/UserManagement/UserTable.js

import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { getUsers, addUser, updateUser, deleteUser } from '../../utils/mockApi';
import ConfirmationDialog from '../common/ConfirmationDialog';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });
    const [userToEdit, setUserToEdit] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        const addedUser = await addUser(newUser);
        setUsers([...users, addedUser]);
        setOpenAddDialog(false);
        setNewUser({ name: '', email: '', role: '', status: 'Active' });
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setNewUser({ name: user.name, email: user.email, role: user.role, status: user.status });
        setOpenEditDialog(true);
    };

    const handleUpdateUser = async () => {
        const updatedUser = await updateUser(userToEdit.id, newUser);
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setOpenEditDialog(false);
        setNewUser({ name: '', email: '', role: '', status: 'Active' });
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setConfirmOpen(true);
    };

    const confirmDeleteUser = async () => {
        await deleteUser(userToDelete.id);  // Assuming the mock API has a delete function
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        setConfirmOpen(false);
        setUserToDelete(null);
    };

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddDialog(true)}
                style={{ marginBottom: '20px' }}
            >
                Add User
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditUser(user)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteUser(user)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add User Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddUser} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateUser} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Deleting User */}
            <ConfirmationDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDeleteUser}
                message={`Are you sure you want to delete the user "${userToDelete?.name}"?`}
            />
        </Box>
    );
};

export default UserTable;
