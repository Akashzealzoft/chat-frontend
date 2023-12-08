import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

import { useEffect } from "react";
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setloading] = useState(true);
  const socket = io("http://localhost:8000", { transports: ["websocket"] });
  const state = useSelector((state) => state.user.user);
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit(
        "chat message",
        JSON.stringify({
          senderId: state.user_id,
          recieverId: state.Reciever_Id,
          text: newMessage,
          username: state.username,
        })
      );
      socket.on("chat message", function (msgs) {
        console.log(msgs);
        messages.innerHTML = "";
        setMessages(msgs);
      });
      setNewMessage("");
    }
  };
  //  useEffect(() => {
  //    fetch("http://localhost:3000/api/chat/getchat")
  //      .then((res) => res.json())
  //      .then(setMessages)
  //      .then(setloading(false))
  //      .catch(console.log);
  //  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/chat/getchat",
          {
            senderIdToMatch: state.user_id,
            receiverIdToMatch: state.Reciever_Id,
          }
        );
        console.log(response.data);
        setMessages(response.data);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //socket adding messages
  useEffect(() => {
    if (socket) {
      socket.on("chat message", (msgs) => {
        console.log(msgs);
        setMessages(msgs);
      });
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        style={{ padding: "20px", height: "80vh", overflowY: "auto" }}
      >
        <Typography variant="h5" gutterBottom>
          Chat Room
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={message.text}
                secondary={message.sender === "user" ? "You" : "Bot"}
              />
            </ListItem>
          ))}
        </List>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="message"
          label="Type a message"
          name="message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Paper>
    </Container>
  );
};

export default ChatScreen;
