import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunication, logCommunication } from "../../store/communicationList";

function CommunicationMethodManagement() {
  const dispatch = useDispatch();
  const communication = useSelector((state: any) => state.communication.communications);

  const [openDialog, setOpenDialog] = useState(false);
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setNewMethod({
      ...newMethod,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddMethod = () => {
    dispatch(logCommunication(newMethod as any));
    setNewMethod({ name: "", description: "", sequence: "", mandatory: false });
    setOpenDialog(false);
  };

  const handleDeleteMethod = (method: any) => {
    dispatch(deleteCommunication(method));
  };

  return (
    <Box >
      <Button variant="contained" color="secondary" onClick={() => setOpenDialog(true)}>
        Add New Communication Method
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Mandatory</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communication.map((method: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{method.name}</TableCell>
                <TableCell>{method.description}</TableCell>
                <TableCell>{method.sequence}</TableCell>
                <TableCell>{method.mandatory ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteMethod(method)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Communication Method</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newMethod.name}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newMethod.description}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Sequence"
            name="sequence"
            type="number"
            value={newMethod.sequence}
            onChange={handleInputChange}
            margin="dense"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="mandatory"
                checked={newMethod.mandatory}
                onChange={handleInputChange}
              />
            }
            label="Mandatory"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddMethod}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CommunicationMethodManagement;
