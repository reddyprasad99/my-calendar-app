import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setCompanies((prev: any) => [...prev, { ...formData, id: Date.now() }] as any);
    setFormData({
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "",
    });
    handleClose();
  };

  const handleDelete = (id: any) => {
    setCompanies((prev) => prev.filter((company: any) => company.id !== id));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Company Management
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Add Company
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Emails</TableCell>
              <TableCell>Phone Numbers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company: any) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.emails}</TableCell>
                <TableCell>{company.phoneNumbers}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(company.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="LinkedIn Profile"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Emails"
            name="emails"
            value={formData.emails}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone Numbers"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Communication Periodicity (e.g., 2 weeks)"
            name="periodicity"
            value={formData.periodicity}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CompanyManagement;
