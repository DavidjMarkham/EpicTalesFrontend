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
import CustomOption from "./CustomOption";

const API_URL = "http://127.0.0.1:5000/api/story";
const CHAPTER_IMAGE_API_URL = "http://127.0.0.1:5000/api/chapter_image";

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
      let response = await axios.post(API_URL, JSON.stringify({ outline, story, optionText }), { headers: { 'Content-Type': 'application/json' } });
      //setOutline(response.data.outline); // Uncomment this line if you want to display outline for debugging
      setImageUrl(""); // Set image to blank for now until we load it later
      setStory(response.data.story);      
      setOptions(response.data.options);
      let cur_story = response.data.story;

      // Load chapter image after story is loaded to avoid waiting for image to load
      response = await axios.post(CHAPTER_IMAGE_API_URL, JSON.stringify({ "story":cur_story }), { headers: { 'Content-Type': 'application/json' } });
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

  const handleRefreshClick = () => {
    window.location.reload(); // This will refresh the page
  };

  return (
    <ThemeProvider theme={theme}>
      <div sx={{ p: 3 }}>
      <Box m={2} pt={3}>
          <Header />          
          <Story story={story} />
          <StoryImage src={image_url}/>
          <br></br>
          <Options story={story} options={options} handleOptionClick={handleOptionClick} isDisabled={isDisabled} />          
          <br></br>
          {story && (<CustomOption story={story} handleOptionClick={handleOptionClick} isDisabled={isDisabled} />)}          
          {!story && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBeginClick}
              disabled={isDisabled}
              sx={{ mr: 1, mb: 1 }}
            >
              Begin Story
            </Button>
          )}
          {isDisabled && <CircularProgress />}
          <br></br>
          <br></br>
          {story && (<Button
            variant="contained"
            color="secondary"
            onClick={handleRefreshClick}
            sx={{ mr: 1, mb: 1 }}
          >
            Start New Story
          </Button>)}
          <Outline outline={outline} />
        </Box>
      </div>
    </ThemeProvider>
  );
} 

export default App;
