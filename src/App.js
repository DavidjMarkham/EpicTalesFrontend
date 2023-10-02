// App.js

import React, { useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header";
import Outline from "./Outline";
import Story from "./Story";
import Options from "./Options";
import StoryImage from './StoryImage';


const API_URL = "http://127.0.0.1:5000/api/story";

// Create custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0077c2",
    },
  },
});

function App() {
  const [outline, setOutline] = useState("");
  const [story, setStory] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [options, setOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchData = async (story, optionText = "") => {
    try {
      const response = await axios.post(API_URL, JSON.stringify({ outline, story, optionText, image_url }), { headers: { 'Content-Type': 'application/json' } });
      setOutline(response.data.outline);      
      setStory(response.data.story);      
      setOptions(response.data.options);
      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleBeginClick = async () => {
    setIsDisabled(true);
    await fetchData();    
    
    setIsDisabled(false);
  };

  const handleOptionClick = async (optionDescription) => {
    setIsDisabled(true);    

    await fetchData(story,optionDescription);    
    
    setIsDisabled(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div sx={{ p: 3 }}>
      <Box m={2} pt={3}>
          <Header />
          <StoryImage src={image_url}/>
          <Story story={story} />
          <Options story={story} options={options} handleOptionClick={handleOptionClick} isDisabled={isDisabled} />          
          {!story && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBeginClick}
              disabled={isDisabled}
              sx={{ mr: 1, mb: 1 }}
            >
              Begin Adventure
            </Button>
          )}
          {isDisabled && <CircularProgress />}
          <Outline outline={outline} />
        </Box>
      </div>
    </ThemeProvider>
  );
} 

export default App;
