import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const result = await axios.post("http://localhost:8080/chatgpt", {
        message: message,
      });
      setResponse(result.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="App">
      <h1>ChatGPT App</h1>
      <input
        type="text"
        placeholder="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {response && <p>ChatGPT Response: {response}</p>}
    </div>
  );
}

export default App;