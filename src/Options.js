import React from "react";
import Button from "@mui/material/Button";

function Options({ story, options, handleOptionClick, isDisabled }) {
  return (
    <>
      {options.map((option, index) => (
        <Button
          key={index}
          variant="contained"
          color="primary"
          onClick={() => handleOptionClick(story,option)}
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