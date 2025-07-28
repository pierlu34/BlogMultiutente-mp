import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user.slice.js';
import { postSlice } from './post.slice.js';

export const reducers = combineReducers({
    user: userSlice.reducer,
    post: postSlice.reducer,
})