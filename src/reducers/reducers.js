import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user.Slice.js';

export const reducers = combineReducers({
    user: userSlice.reducer,
})