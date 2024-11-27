// src/components/RoleManagement/RoleTable.js

import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { getRoles, addRole, updateRole } from '../../utils/mockApi';

const RoleTable = () => {
    const [roles, setRoles] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newRole, setNewRole] = useState({ name: '', description: '' });
    const [roleToEdit, setRoleToEdit] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            const data = await getRoles();
            setRoles(data);
        };
        fetchRoles();
    }, []);

    const handleAddRole = async () => {
        const addedRole = await addRole(newRole);
        setRoles([...roles, addedRole]);
        setOpenAddDialog(false);
        setNewRole({ name: '', description: '' });
    };

    const handleEditRole = (role) => {
        setRoleToEdit(role);
        setNewRole({ name: role.name, description: role.description });
        setOpenEditDialog(true);
    };

    const handleUpdateRole = async () => {
        const updatedRole = await updateRole(roleToEdit.id, newRole);
        setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
        setOpenEditDialog(false);
        setNewRole({ name: '', description: '' });
    };

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddDialog(true)}
                style={{ marginBottom: '20px' }}
            >
                Add Role
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Role Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{role.description}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditRole(role)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Role Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add New Role</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Description"
                        value={newRole.description}
                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddRole} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Role Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Role</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Description"
                        value={newRole.description}
                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateRole} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RoleTable;
