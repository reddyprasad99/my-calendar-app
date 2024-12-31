import { Box, Button, Checkbox, FormControlLabel, Paper, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { filterGridCommunications } from 'utils/date';
import CommunicationModal from "./CommunicationModal";

function CommunicationTable() {
  const companies = useSelector((state: any) => state.company.companies);
  const communications = useSelector((state: any) => state.communication.communications);

  const filteredNotifications = filterGridCommunications(companies, communications);

  const [selectedCompanies, setSelectedCompanies]: any = useState([]); 
  const [open, setOpen] = useState(false);

  const handleSelectCompany = (companyId: any) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id: any) => id !== companyId)); 
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Company Communication Dashboard
      </Typography>

      {/* Table to display company communication data */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                {/* Checkbox for multi-selection */}
                <FormControlLabel
                  control={<Checkbox checked={selectedCompanies.length === filteredNotifications.length} onChange={() => setSelectedCompanies(selectedCompanies.length === filteredNotifications.length ? [] : filteredNotifications.map((company: any) => company.id))} />}
                  label="Select All"
                />
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Company Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Last Five Communications</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Next Scheduled Communication</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((company: any) => {
              const lastFiveComm = company.lastFiveCommunications
                .map((communication: any) =>
                  `${communication.type} - ${dayjs(communication.date).format("D MMMM YYYY")}`
                )
                .join(", ");

              const nextCommunication = `${company.communicationPeriodicity} - ${dayjs(company.nextScheduledCommunication).format("D MMMM YYYY")}`;

              return (
                <tr
                  key={company.id}
                  style={{
                    backgroundColor: company.isOverdue
                      ? "#ffcccc" // Red for overdue
                      : company.isToday
                      ? "#ffffcc" // Yellow for today
                      : "#ffffff",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {/* Checkbox for individual row selection */}
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <Checkbox
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => handleSelectCompany(company.id)}
                    />
                  </td>

                  {/* Company Name with Tooltip */}
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <Tooltip title={company.comments} placement="top" arrow>
                      <Typography variant="body1">{company.name}</Typography>
                    </Tooltip>
                  </td>

                  {/* Last Five Communications */}
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <Typography variant="body2" color="textSecondary">
                      {lastFiveComm}
                    </Typography>
                  </td>

                  {/* Next Scheduled Communication */}
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <Typography variant="body2" color="textSecondary">
                      {nextCommunication}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Paper>

      {/* Communication Performed Button */}
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginTop: 2 }}>
        Communication Performed
      </Button>

      {/* Modal for adding communication */}
      <CommunicationModal
        open={open}
        onClose={handleCloseModal}
        selectedCompanies={selectedCompanies} // Pass selected companies to modal
      />
    </Box>
  );
}

export default CommunicationTable;
