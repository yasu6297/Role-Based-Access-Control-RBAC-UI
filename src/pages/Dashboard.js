// src/pages/Dashboard.js

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserManagement/UserTable';
import RoleTable from '../components/RoleManagement/RoleTable';
import PermissionTable from '../components/PermissionManagement/PermissionTable';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <Navbar />
            <Box padding={3}>
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Tabs value={selectedTab} onChange={handleChange} style={{ marginBottom: '20px' }}>
                    <Tab label="User Management" />
                    <Tab label="Role Management" />
                    <Tab label="Permission Management" />
                </Tabs>

                {selectedTab === 0 && <UserTable />}
                {selectedTab === 1 && <RoleTable />}
                {selectedTab === 2 && <PermissionTable />}
            </Box>
        </Box>
    );
};

export default Dashboard;
