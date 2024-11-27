// src/data/rolesPermissions.js
export const roles = [
    {
        id: 1,
        name: 'Admin',
        permissions: ['read', 'write'], // Admin has both read and write permissions
    },
    {
        id: 2,
        name: 'Manager',
        permissions: ['read'], // Manager can only read, cannot write
    },
    {
        id: 3,
        name: 'Viewer',
        permissions: ['read'], // Viewer also can only read
    },
];
