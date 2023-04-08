import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [story, setStory] = useState("");
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const fetchData = async (optionText = "") => {
    try {
      const result = await axios.post("http://localhost:8080/chatgpt", {
        optionText: optionText,
      });
      // Parse the JSON string
      console.log(result.data.response);
      const parsedData = JSON.parse(result.data.response);

      setStory(parsedData.story);
      setOptions(parsedData.options || []);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (!story) {
      fetchData();
    }
  }, [story]);

  const handleOptionClick = async (optionText) => {
    setDisabled(true);
    await fetchData(optionText);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>ChatGPT App</h1>
      {story && <p>{story}</p>}
      {options && options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option)}
          disabled={disabled}
        >
          {option}
        </button>
      ))}
      <button          
          onClick={() => fetchData("")}
          disabled={disabled}
        >
          BEGIN
        </button>
    </div>
  );
}

export default App;