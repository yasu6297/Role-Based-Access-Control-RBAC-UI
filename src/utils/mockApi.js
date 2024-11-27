// src/utils/mockApi.js

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User', status: 'Inactive' },
];

let roles = [
    { id: 1, name: 'Admin', description: 'Full access to all features and settings' },
    { id: 2, name: 'User', description: 'Limited access to basic features' },
];

let permissions = [
    { id: 1, name: 'View Dashboard', description: 'Permission to view the dashboard' },
    { id: 2, name: 'Manage Users', description: 'Permission to create, edit, or delete users' },
];

// Get users
export const getUsers = async () => {
    await delay(500);
    return users;
};

// Add user
export const addUser = async (user) => {
    await delay(500);
    user.id = Date.now();
    users.push(user);
    return user;
};

// Update user
export const updateUser = async (userId, updatedUser) => {
    await delay(500);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        return users[userIndex];
    }
    return null;
};

// Delete user
export const deleteUser = async (userId) => {
    await delay(500);
    users = users.filter((user) => user.id !== userId);
    return { success: true };
};

// Get roles
export const getRoles = async () => {
    await delay(500);
    return roles;
};

// Add role
export const addRole = async (role) => {
    await delay(500);
    role.id = Date.now();
    roles.push(role);
    return role;
};

// Update role
export const updateRole = async (roleId, updatedRole) => {
    await delay(500);
    const roleIndex = roles.findIndex((role) => role.id === roleId);
    if (roleIndex !== -1) {
        roles[roleIndex] = { ...roles[roleIndex], ...updatedRole };
        return roles[roleIndex];
    }
    return null;
};

// Delete role
export const deleteRole = async (roleId) => {
    await delay(500);
    roles = roles.filter((role) => role.id !== roleId);
    return { success: true };
};

// Get permissions
export const getPermissions = async () => {
    await delay(500);
    return permissions;
};

// Add permission
export const addPermission = async (permission) => {
    await delay(500);
    permission.id = Date.now();
    permissions.push(permission);
    return permission;
};

// Update permission
export const updatePermission = async (permissionId, updatedPermission) => {
    await delay(500);
    const permissionIndex = permissions.findIndex((permission) => permission.id === permissionId);
    if (permissionIndex !== -1) {
        permissions[permissionIndex] = { ...permissions[permissionIndex], ...updatedPermission };
        return permissions[permissionIndex];
    }
    return null;
};

// Delete permission
export const deletePermission = async (permissionId) => {
    await delay(500);
    permissions = permissions.filter((permission) => permission.id !== permissionId);
    return { success: true };
};
