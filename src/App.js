// App.js

import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header";
import Outline from "./Outline";
import StorySoFar from "./StorySoFar";
import Story from "./Story";
import Options from "./Options";
import StoryImage from './StoryImage';
import CustomOption from "./CustomOption";

const DEBUG = false; // Set to true to enable debugging
const API_URL = "http://127.0.0.1:5000/api/story";
const CHAPTER_IMAGE_API_URL = "http://127.0.0.1:5000/api/chapter_image";
const READ_TEXT_API_URL = "http://127.0.0.1:5000/api/read_text";

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
  const [storySoFar, setStorySoFar] = useState("");
  const [story, setStory] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [options, setOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const readTextAloud = async (cur_story) => {
      try {
          const audioResponse = await axios.post(READ_TEXT_API_URL, JSON.stringify({ story: cur_story }), { headers: { 'Content-Type': 'application/json' } });
          const audioUrl = audioResponse.data.audioFilename;
          playAudio(audioUrl);
      } catch (error) {
          console.error("Error fetching audio:", error);
      }
  };

  const playAudio = (url) => {
      const audio = new Audio(url);
      audio.play();
  };

  const fetchData = async (story, optionText = "") => {
    try {
      let response = await axios.post(API_URL, JSON.stringify({ outline, storySoFar, story, optionText }), { headers: { 'Content-Type': 'application/json' } });
      setOutline(response.data.outline);
      setStorySoFar(response.data.storySoFar); 
      setImageUrl(""); // Set image to blank for now until we load it later
      setStory(response.data.story);      
      setOptions(response.data.options);
      let cur_story = response.data.story;

      readTextAloud(cur_story);
    
      // Load chapter image after story is loaded to avoid waiting for image to load
      if(!DEBUG) {
        response = await axios.post(CHAPTER_IMAGE_API_URL, JSON.stringify({ "story":cur_story }), { headers: { 'Content-Type': 'application/json' } });
        setImageUrl(response.data.image_url);
      }
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
        {!DEBUG && story &&  
          <StoryImage src={image_url} imageLoaded={imageLoaded} setImageLoaded={setImageLoaded}>
            <Story story={story} />
          </StoryImage>
        }
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
              size="large"
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
            size="large"
            sx={{ mr: 1, mb: 1, px: 2, py: 1 }}  /* Adjusted padding for better touch */
          >
            Start New Story
          </Button>)}
          <Outline outline={outline} />
          <StorySoFar storySoFar={storySoFar} />
        </Box>
        
      </div>
    </ThemeProvider>
  );
} 

export default App;
