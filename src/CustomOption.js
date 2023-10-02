import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function CustomOption({ handleOptionClick, isDisabled }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleOptionClick(inputValue);
    setInputValue(""); // Clear the input field after submitting
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TextField
        variant="outlined"
        value={inputValue}
        placeholder="Enter custom action" // Placeholder text
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isDisabled}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isDisabled}
      >
        Submit
      </Button>
    </form>
  );
}

export default CustomOption;
