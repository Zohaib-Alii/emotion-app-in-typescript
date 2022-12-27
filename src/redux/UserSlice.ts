import { createSlice } from "@reduxjs/toolkit";
import { State } from "../Interfaces/InitialInterface";
// ts interface
// type State = {
//   userName: string;
//   userID: string | number;
//   test: boolean;
//   allFeeds: string[];
// };
// type:feeds: {id:number | string, nickName: string, Bio: string ,image:string,Religion:string}[]

const initialState: State = {
  userName: "New User",
  userID: "123",
  test: false,
  allFeeds: [],
};

const currentUserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    settingUserID: (state, action) => {
      state.userID = action.payload?.uid;
      state.userName = action.payload?.displayName;
    },
    handleFeeds: (state, action) => {
      state.allFeeds = action.payload;
    },
    // handleStateCheck: (state, action) => {
    //   state.currentUser = action.payload;
    // },
  },
});
export const { settingUserID, handleFeeds } = currentUserSlice.actions;

export default currentUserSlice.reducer;
