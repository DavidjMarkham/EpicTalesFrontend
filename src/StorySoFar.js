import React from "react";
import Typography from "@mui/material/Typography";

function StorySoFar({ storySoFar }) {      
  // If storySoFar prop is not provided or false, do not render anything
  if (!storySoFar) return null;

  return (
    <Typography variant="body1" sx={{ mb: 3 }}>
      StorySoFar: <br></br>
      {storySoFar}
    </Typography>
  );
}

export default StorySoFar;
