import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { setRecieverId } from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [contacts, setcontacts] = useState("");
  const [loading, setloading] = useState(true);
  const state = useSelector((state) => state.user.user);
  console.log(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/getAll"
        );

        const filteredContacts = response.data.data.filter(
          (e) => e._id !== state.user_id
        );
        setcontacts(filteredContacts);
        setloading(false);

        console.log(response.data.data);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  const handleGridItemClick = (paras) => {
    dispatch(setRecieverId({ payload: paras }));
    navigate("/chat");
  };

  if (loading) {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Typography variant="h1" gutterBottom>
                  Loading.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Grid container spacing={2}>
            {contacts.map((e) => (
              <Grid
                item
                xs={12}
                key={e._id}
                onClick={() => handleGridItemClick(e._id)}
              >
                <Typography variant="subtitle1" gutterBottom>
                  {e.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
