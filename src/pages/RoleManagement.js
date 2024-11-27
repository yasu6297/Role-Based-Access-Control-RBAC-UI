// src/pages/RoleManagement.js

import React, { useState } from 'react';
import { roles } from '../data/rolesPermissions';

const RoleManagement = () => {
    // Mock list of users
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice', roleId: null },
        { id: 2, name: 'Bob', roleId: null },
    ]);

    const handleRoleChange = (userId, roleId) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, roleId: parseInt(roleId) } : user
            )
        );
    };

    return (
        <div>
            <h2>Role Management</h2>
            {users.map((user) => (
                <div key={user.id} style={{ marginBottom: '20px' }}>
                    <span>{user.name}</span>
                    <select
                        value={user.roleId || ''}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default RoleManagement;
