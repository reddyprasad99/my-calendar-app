import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

function NotificationPanel() {
  const overdueCommunications = ['Company A', 'Company B'];
  const todaysCommunications = ['Company C'];

  return (
    <Box>
      <Typography variant="h6">Notifications</Typography>
      <Typography variant="subtitle1">Overdue Communications</Typography>
      <List>
        {overdueCommunications.map((company, index) => (
          <ListItem key={index}>
            <ListItemText primary={company} />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1">Today’s Communications</Typography>
      <List>
        {todaysCommunications.map((company, index) => (
          <ListItem key={index}>
            <ListItemText primary={company} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default NotificationPanel;
