import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";
import CalendarView from '../components/user/CalendarView';
import Dashboard from '../components/user/Dashboard/Dashboard';

const UserPanel = () => {
    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event: any, newValue: any) => {
      setTab(newValue);
    };

  return (
    <Box>
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                User Panel
                </Typography>
            </Toolbar>
        </AppBar>
        <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Dashboard" />
            <Tab label="Calendar View" />
        </Tabs>
        <Box sx={{p: 2 }}>
        {tab === 0 && <Dashboard />}
        {tab === 1 && <CalendarView />}
        </Box>
    </Box>
  )
};

export default UserPanel;
