import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { editCompany } from 'store/companyList';

function CommunicationModal({ open, onClose, selectedCompanies }: any) {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [comments, setNotes] = useState('');
  const dispatch = useDispatch();


  const handleSubmit = () => {
    console.log(selectedCompanies, "reddy")
    selectedCompanies.forEach((companyId: any) => {
      dispatch(editCompany({ companyId, type, date, comments }));
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log Communication</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Type of Communication"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          margin="normal"
        >
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Call">Call</MenuItem>
        </TextField>
        <TextField
          label="Date of Communication"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="comments"
          fullWidth
          value={comments}
          onChange={(e) => setNotes(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommunicationModal;
