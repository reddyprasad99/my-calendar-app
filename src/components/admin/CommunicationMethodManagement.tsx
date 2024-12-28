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

const defaultMethods = [
  { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
  { name: "LinkedIn Message", description: "Send a message on LinkedIn", sequence: 2, mandatory: true },
  { name: "Email", description: "Send an email", sequence: 3, mandatory: true },
  { name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
  { name: "Other", description: "Other methods of communication", sequence: 5, mandatory: false },
];

function CommunicationMethodManagement() {
  const [methods, setMethods] = useState(defaultMethods);
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
    setMethods([...methods, { ...newMethod, sequence: Number(newMethod.sequence) }]);
    setNewMethod({ name: "", description: "", sequence: "", mandatory: false });
    setOpenDialog(false);
  };

  const handleDeleteMethod = (index: number) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
  };

  return (
    <Box p={3}>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add Communication Method
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
            {methods.map((method, index) => (
              <TableRow key={index}>
                <TableCell>{method.name}</TableCell>
                <TableCell>{method.description}</TableCell>
                <TableCell>{method.sequence}</TableCell>
                <TableCell>{method.mandatory ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteMethod(index)}
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
