import { createSlice } from "@reduxjs/toolkit";
import { api } from '../../services/api/api';

const authSlice = createSlice({
      name: 'auth',
      initialState: { user: null, token: null, loggedInUser: null },
      reducers: {},
      extraReducers: (builder) => {
            builder.addMatcher(
                  api.endpoints.login.matchFulfilled, (state, action) => {
                        state.user = action.payload.user;
                        state.token = action.payload.token;
                  }
            )
      }
})

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;