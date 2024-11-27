const roles = [
  { id: 1, name: 'Admin', description: 'Administrator with full access' },
  { id: 2, name: 'User', description: 'Regular user with limited access' },
];

const permissions = [
  { id: 1, name: 'Read', description: 'Can view content' },
  { id: 2, name: 'Write', description: 'Can edit content' },
  { id: 3, name: 'Delete', description: 'Can delete content' },
];

const users = [
  { id: 1, name: 'John Doe', role: 1 },
  { id: 2, name: 'Jane Smith', role: 2 },
];

// Mock API Functions for Roles
export const fetchRoles = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(roles), 500));
};

export const addRole = async (role) => {
  const newRole = { ...role, id: roles.length + 1 };
  roles.push(newRole);
  return newRole;
};

export const updateRole = async (updatedRole) => {
  const index = roles.findIndex((role) => role.id === updatedRole.id);
  roles[index] = updatedRole;
  return updatedRole;
};

export const deleteRole = async (id) => {
  const index = roles.findIndex((role) => role.id === id);
  roles.splice(index, 1);
  return id;
};

// Mock API Functions for Users
export const fetchUsers = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(users), 500));
};

export const addUser = async (user) => {
  const newUser = { ...user, id: users.length + 1 };
  users.push(newUser);
  return newUser;
};

export const updateUser = async (updatedUser) => {
  const index = users.findIndex((user) => user.id === updatedUser.id);
  users[index] = updatedUser;
  return updatedUser;
};

export const deleteUser = async (id) => {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return id;
};

// Mock API Functions for Permissions (Add these functions)
export const fetchPermissions = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(permissions), 500));
};

export const addPermission = async (permission) => {
  const newPermission = { ...permission, id: permissions.length + 1 };
  permissions.push(newPermission);
  return newPermission;
};

export const updatePermission = async (updatedPermission) => {
  const index = permissions.findIndex((permission) => permission.id === updatedPermission.id);
  permissions[index] = updatedPermission;
  return updatedPermission;
};

export const deletePermission = async (id) => {
  const index = permissions.findIndex((permission) => permission.id === id);
  permissions.splice(index, 1);
  return id;
};
