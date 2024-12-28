import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import CommunicationMethodManagement from "components/admin/CommunicationMethodManagement";
import CompanyManagements from "components/admin/CompanyManagement";
import React, { useState } from "react";

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event: any, newValue: any) => {
        setSelectedTab(newValue)
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                    Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Tabs value={selectedTab} onChange={handleChange} centered>
                <Tab label="Company Management" />
                <Tab label="Communication Method Management" />
            </Tabs>
            <Box sx={{ mt: 3, p: 2 }}>
                {selectedTab ===  0 && <CompanyManagements />}
                {selectedTab === 1 && <CommunicationMethodManagement />}
            </Box>
        </Box>
    );
}

export default AdminPage;

