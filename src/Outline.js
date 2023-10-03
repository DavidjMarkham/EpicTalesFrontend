import React from "react";
import Typography from "@mui/material/Typography";

function Outline({ outline }) {      
  // If outline prop is not provided or false, do not render anything
  if (!outline) return null;

  return (
    <Typography variant="body1" sx={{ mb: 3 }}>
      Outline: <br></br>
      {outline}
    </Typography>
  );
}

export default Outline;
