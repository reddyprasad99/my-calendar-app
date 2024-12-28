import { Grid } from '@mui/material';
import React from 'react';
import CommunicationGrid from './CommunicationGrid';
import NotificationPanel from './NotificationPanel';

function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9} sx={{ p: 2}}>
        <CommunicationGrid />
      </Grid>
      <Grid item xs={12} md={3} >
        <NotificationPanel />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
