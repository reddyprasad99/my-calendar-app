import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Communication Tracker
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Manage and track your communications efficiently with companies.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin")}
          sx={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          Go to Admin Module
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/user")}
          sx={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          Go to User Module
        </Button>
      </Box>
    </Container>
  );
};

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin"  />
        <Route path="/user"  />
      </Routes>
    </Router>
  );
};

export default App;
