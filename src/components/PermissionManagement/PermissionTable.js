// src/components/PermissionManagement/PermissionManagementDashboard.js

import React, { useState, useEffect } from 'react';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { getPermissions, updatePermission, deletePermission } from '../../utils/mockApi';
import ConfirmationDialog from '../common/ConfirmationDialog';

const PermissionTable = () => {
    const [permissions, setPermissions] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [newPermissionName, setNewPermissionName] = useState('');
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [permissionToDelete, setPermissionToDelete] = useState(null);

    useEffect(() => {
        const fetchPermissions = async () => {
            const data = await getPermissions();
            setPermissions(data);
        };
        fetchPermissions();
    }, []);

    const handleEditPermission = (permission) => {
        setSelectedPermission(permission);
        setNewPermissionName(permission.name); // Pre-fill the permission name
        setOpenEditDialog(true);
    };

    const handleUpdatePermission = async () => {
        const updatedPermission = { ...selectedPermission, name: newPermissionName };
        await updatePermission(updatedPermission.id, updatedPermission);
        setPermissions(permissions.map(p => p.id === updatedPermission.id ? updatedPermission : p));
        setOpenEditDialog(false);
        setSelectedPermission(null);
    };

    const handleDeletePermission = (permission) => {
        setPermissionToDelete(permission);
        setConfirmDeleteOpen(true);
    };

    const confirmDeletePermission = async () => {
        await deletePermission(permissionToDelete.id);
        setPermissions(permissions.filter(permission => permission.id !== permissionToDelete.id));
        setConfirmDeleteOpen(false);
        setPermissionToDelete(null);
    };

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={() => alert('Add permission functionality (to be implemented)')} style={{ marginBottom: '20px' }}>
                Add Permission
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Permission</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permissions.map(permission => (
                            <TableRow key={permission.id}>
                                <TableCell>{permission.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditPermission(permission)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeletePermission(permission)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Permission Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Permission</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Permission Name"
                        value={newPermissionName}
                        onChange={(e) => setNewPermissionName(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdatePermission} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Deleting Permission */}
            <ConfirmationDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={confirmDeletePermission}
                message={`Are you sure you want to delete the permission "${permissionToDelete?.name}"?`}
            />
        </Box>
    );
};

export default PermissionTable;
