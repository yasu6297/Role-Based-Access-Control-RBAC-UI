// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { addUser, updateUser } from '../utils/api';

function UserForm({ user, setEditUser, roles }) {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [role, setRole] = useState(user ? user.role : '');
  const [active, setActive] = useState(user ? user.active : true);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setActive(user.active);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, role, active };

    if (user) {
      await updateUser(user.id, newUser);
    } else {
      await addUser(newUser);
    }
    setEditUser(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox checked={active} onChange={() => setActive(!active)} />}
        label="Active"
      />
      <Button type="submit">Save</Button>
    </form>
  );
}

export default UserForm;
