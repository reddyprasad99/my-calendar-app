import { AccessAlarm, Today } from '@mui/icons-material';
import { Badge, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { filterGridCommunications } from 'utils/date';

function NotificationPanel() {
  const companies = useSelector((state: any) => state.company.companies);
  const communications = useSelector((state: any) => state.communication.communications);

  const filteredNotifications = filterGridCommunications(companies, communications);

  const overdueCommunications = filteredNotifications.filter((company: any) => company.isOverdue);
  const todaysCommunications = filteredNotifications.filter((company: any) => company.isToday);

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Notifications Panel
      </Typography>

      {/* Overdue Communications Section */}
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AccessAlarm sx={{ mr: 1 }} />
        Overdue Communications
        <Badge badgeContent={overdueCommunications.length} color="error" sx={{ ml: 2 }} />
      </Typography>
      <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
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

      {/* Today's Communications Section */}
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
        <Today sx={{ mr: 1 }} />
        Today’s Communications
        <Badge badgeContent={todaysCommunications.length} color="primary" sx={{ ml: 2 }} />
      </Typography>
      <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
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
