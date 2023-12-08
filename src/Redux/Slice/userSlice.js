import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    user_id: "",
    Reciever_Id: "",
    username: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state) => {
      console.log(state);
      state.user.isAuthenticated = true;
    },
    setUserId: (state, action) => {
      console.log(action);
      state.user.user_id = action.payload.payload;
    },
    setRecieverId: (state, action) => {
      console.log(action);
      state.user.Reciever_Id = action.payload.payload;
    },
    setUsername: (state, action) => {
      console.log(action);
      state.user.username = action.payload.payload;
    },
  },
});
export const { setIsFetching, setUserId, setRecieverId, setUsername } =
  userSlice.actions;
export default userSlice.reducer;
