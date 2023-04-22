import React from "react";
import Typography from "@mui/material/Typography";

function Story({ story }) {
  return (
    <Typography variant="body1" sx={{ mb: 3 }}>
      {story}
    </Typography>
  );
}

export default Story;
