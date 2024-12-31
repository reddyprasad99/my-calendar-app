import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { filterNotifications } from 'utils/date';

function NotificationPanel() {
  const companies = useSelector((state: any) => state.company.companies);
  const communications = useSelector((state: any) => state.communication.communications); // Assuming you have a communication slice

  const filteredNotifications = filterNotifications(companies, communications);

  const overdueCommunications = filteredNotifications.filter((company: any) => company.isOverdue);
  const todaysCommunications = filteredNotifications.filter((company: any) => company.isToday);

  return (
    <Box>
      <Typography variant="h6">Notifications</Typography>

      {/* Overdue Communications */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Overdue Communications
      </Typography>
      <List>
        {overdueCommunications.length === 0 ? (
          <ListItem>
            <ListItemText primary="No overdue communications" />
          </ListItem>
        ) : (
          overdueCommunications.map((company: any, index: any) => (
            <ListItem key={index}>
              <ListItemText primary={company.name} />
            </ListItem>
          ))
        )}
      </List>

      {/* Today's Communications */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Today’s Communications
      </Typography>
      <List>
        {todaysCommunications.length === 0 ? (
          <ListItem>
            <ListItemText primary="No communications due today" />
          </ListItem>
        ) : (
          todaysCommunications.map((company: any, index: any) => (
            <ListItem key={index}>
              <ListItemText primary={company.name} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}

export default NotificationPanel;
