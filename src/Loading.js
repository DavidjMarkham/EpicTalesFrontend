import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loading({ isDisabled }) {
  return isDisabled ? <CircularProgress /> : null;
}

export default Loading;