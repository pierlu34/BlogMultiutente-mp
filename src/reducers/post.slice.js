import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        clearPosts: () => initialState
    }
})

export const { setPosts, clearPosts } = postSlice.actions;
export const postSelector = (state) => state.post.posts.posts