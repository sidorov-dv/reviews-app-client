import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const SideBlock = ({ title, children }) => {
  return (
    <Paper sx={{ p: 1, mb: 3 }} elevation={6}>
      <Typography
        variant="h5"
        sx={{ py: 1, textAlign: "center", fontWeight: 700 }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default SideBlock;
