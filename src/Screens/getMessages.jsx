import React from "react";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function GetMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with username and message values, e.g., send them to a server
    console.log("Submitted:", { username, message });
    socket.emit(
      "chat message",
      JSON.stringify({
        text: message,
        username: username,
      })
    );
    socket.on("chat message", function (msgs) {
      console.log(msgs);
      messages.innerHTML = "";
      setMessages(msgs);
    });
    // Clear input fields after submission
    setUsername("");
    setMessage("");
  };

  const divStyle = {
    padding: "10px 20px",
    width: "150px",
    marginBottom: "10px",
    backgroundColor: "lightblue",
    borderRadius: "10px",
  };
  const socket = io("http://localhost:8000", { transports: ["websocket"] });

  useEffect(() => {
    fetch("http://localhost:3000/api/chat/getchat")
      .then((res) => res.json())
      .then(setMessages)
      .then(setloading(false))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (msgs) => {
        setMessages(msgs);
      });
    }
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      {messages.map((e, i) => (
        <div style={divStyle} key={i}>
          <p>
            {e.text},{e.username}
          </p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
