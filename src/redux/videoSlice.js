import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  currentVideo: null,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.currentVideo = null;
      state.error = false;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
      state.error = false;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.currentVideo = null;
      state.error = true;
    },
    likes: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);

        let index = state.currentVideo.dislikes.findIndex(
          (id) => id === action.payload
        );
        state.currentVideo.dislikes.splice(index, 1);
      }
    },
    dislikes: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);

        let index = state.currentVideo.likes.findIndex(
          (id) => id === action.payload
        );
        state.currentVideo.likes.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchStart, fetchSuccess, fetchFailure, likes, dislikes } =
  videoSlice.actions;

export default videoSlice.reducer;
