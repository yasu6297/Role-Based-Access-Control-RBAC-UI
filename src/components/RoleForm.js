// src/components/RoleForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { addRole, updateRole } from '../utils/api';

function RoleForm({ role, setEditRole }) {
  const [name, setName] = useState(role ? role.name : '');
  const [permissions, setPermissions] = useState(role ? role.permissions : []);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setPermissions(role.permissions);
    }
  }, [role]);

  const togglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRole = { name, permissions };

    if (role) {
      await updateRole(role.id, newRole);
    } else {
      await addRole(newRole);
    }
    setEditRole(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Role Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div>
        {['Read', 'Write', 'Delete'].map((permission) => (
          <FormControlLabel
            key={permission}
            control={
              <Checkbox
                checked={permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
              />
            }
            label={permission}
          />
        ))}
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default RoleForm;
