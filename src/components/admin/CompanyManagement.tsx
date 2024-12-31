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
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, deleteCompany, updateCompany } from "store/companyList";

function CompanyManagement() {
  const dispatch = useDispatch();
  const companies = useSelector((state: any) => state.company.companies);

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    communicationPeriodicity: "",
  });

  const handleOpen = (company?: any) => {
    if (company) {
      setIsEditMode(true);
      setSelectedCompany(company);
      setFormData({
        name: company.name,
        location: company.location,
        linkedinProfile: company.linkedinProfile,
        emails: company.emails,
        phoneNumbers: company.phoneNumbers,
        comments: company.comments,
        communicationPeriodicity: company.communicationPeriodicity,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: "",
        location: "",
        linkedinProfile: "",
        emails: "",
        phoneNumbers: "",
        comments: "",
        communicationPeriodicity: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditMode) {
      dispatch(updateCompany({ ...formData, id: selectedCompany.id } as any));
    } else {
      dispatch(addCompany({ ...formData, id: Date.now() } as any));
    }
    handleClose();
  };

  const handleDelete = (company: any) => {
    dispatch(deleteCompany(company));
  };

  return (
    <Box>
      <Button variant="contained" color="secondary" onClick={() => handleOpen()}>
        Add New Company
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
                    color="primary"
                    onClick={() => handleOpen(company)}
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(company)}
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
        <DialogTitle>{isEditMode ? "Edit Company" : "Add Company"}</DialogTitle>
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
            name="linkedinProfile"
            value={formData.linkedinProfile}
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
            label="Communication Periodicity (e.g., 2 weeks)"
            name="communicationPeriodicity"
            value={formData.communicationPeriodicity}
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
