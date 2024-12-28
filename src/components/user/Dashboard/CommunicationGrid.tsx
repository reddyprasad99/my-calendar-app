import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

function CommunicationGrid() {
  const rows = [
    { id: 1, companyName: 'Company A', lastFive: 'Email, Call', next: 'Call - 30th Dec', status: 'overdue' },
    { id: 2, companyName: 'Company B', lastFive: 'LinkedIn Post', next: 'Email - 28th Dec', status: 'due' },
  ];

  const columns = [
    { field: 'companyName', headerName: 'Company Name', flex: 1 },
    { field: 'lastFive', headerName: 'Last Five Communications', flex: 2 },
    { field: 'next', headerName: 'Next Scheduled Communication', flex: 2 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: any) => (
        <span style={{ color: params.value === 'overdue' ? 'red' : 'orange' }}>
          {params.value === 'overdue' ? 'Overdue' : 'Due'}
        </span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: () => <Button variant="outlined">Mark as Done</Button>,
    },
  ];

  return <DataGrid rows={rows} columns={columns} autoHeight />;
}

export default CommunicationGrid;
