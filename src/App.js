import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = "http://localhost:8080/chatgpt";

// Create custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0077c2",
    },
  },
});

function App() {
  const [story, setStory] = useState("");
  const [options, setOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchData = async (story, optionText = "") => {
    try {
      const response = await axios.post(API_URL, { story, optionText });
      const data = JSON.parse(response.data.response);

      setStory(data.story);
      setOptions(data.options || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBeginClick = async () => {
    setIsDisabled(true);
    await fetchData("");
    setIsDisabled(false);
  };

  const handleOptionClick = async (story, optionText) => {
    setIsDisabled(true);
    await fetchData(story, optionText);
    setIsDisabled(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div sx={{ p: 3 }}>
      <Box m={2} pt={3}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Choose Your Own Adventure
          </Typography>
          {story && (
            <Typography variant="body1" sx={{ mb: 3 }}>
              {story}
            </Typography>
          )}
          {options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              onClick={() => handleOptionClick(story, option)}
              disabled={isDisabled}
              sx={{ mr: 1, mb: 1 }}
            >
              {option}
            </Button>
          ))}
          {!story && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBeginClick()}
              disabled={isDisabled}
              sx={{ mr: 1, mb: 1 }}
            >
              Begin Adventure
            </Button>
          )}
          {isDisabled && <CircularProgress />}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;