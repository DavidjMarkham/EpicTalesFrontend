import React from "react";
import Button from "@mui/material/Button";

function Options({ options, handleOptionClick, isDisabled }) {
  return (
    <>
      {options.map((option) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOptionClick(option)}
          disabled={isDisabled}
          sx={{ mr: 1, mb: 1 }}
        >
          {option}
        </Button>
      ))}
    </>
  );
}

export default Options;