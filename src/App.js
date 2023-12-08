import logo from "./logo.svg";
import "./App.css";
import GetMessages from "./Screens/getMessages";
import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import UserList from "./Screens/UserList";
import ChatScreen from "./Screens/Chatscreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/list" element={<UserList />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
