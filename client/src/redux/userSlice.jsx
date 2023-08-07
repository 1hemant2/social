import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // console.log(state.user, "userSlice");
        }
    }
})
export const { setUser } = userSlice.actions;