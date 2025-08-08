import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  cursor: null,
  direction: "next",
  limit: 10,
  nextCursor: null,
  prevCursor: null,
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const { posts, cursor, direction, limit, nextCursor, prevCursor } =
        action.payload;

      state.posts = posts;
      state.cursor = cursor;
      state.direction = direction;
      state.limit = limit;
      state.nextCursor = nextCursor;
      state.prevCursor = prevCursor;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    clearPosts: () => initialState,
  },
});

export const { setPosts, clearPosts, removePost } = postSlice.actions;

export const postSelector = (state) => state.post.posts;
