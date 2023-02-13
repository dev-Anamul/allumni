/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '../../utils/cookie';
import { decrypt, encrypt } from '../../utils/cryptio';

export const signup = createAsyncThunk(
    'auth/signup',
    async (data, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/users/signup`,
                data
            );
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
                data
            );
            const token = encrypt(response.data.token, process.env.REACT_APP_ENC_KEY);
            setCookie('token', token, 7);
            return fulfillWithValue(response.data.data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getMe = createAsyncThunk(
    'auth/getMe',
    async (sentData, { fulfillWithValue, rejectWithValue }) => {
        console.log('getMe');
        // ! get cookie from here
        const data = getCookie('token');
        let token = '';
        if (data) {
            token = decrypt(data, process.env.REACT_APP_ENC_KEY);
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return fulfillWithValue(response.data.data);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    'auth/getAllUsers',
    async (sentData, { fulfillWithValue, rejectWithValue }) => {
        // ! get cookie from here
        const data = getCookie('token');
        let token = '';
        if (data) {
            token = decrypt(data, process.env.REACT_APP_ENC_KEY);
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return fulfillWithValue(response.data.data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initisalState = {
    data: [],
    user: null,
    signupMessage: null,
    signupErorr: null,
    signupAlert: false,
    loginError: null,
    loginAlert: false,
    loginRequest: false,
    error: null,
    loading: false,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initisalState,
    reducers: {
        logout: (state) => {
            removeCookie('token');
            state.user = null;
            state.isAuthenticated = false;
        },
        closeSingupAlert: (state) => {
            state.signupMessage = null;
            state.signupAlert = false;
        },
        closeLoginAlert: (state) => {
            state.loginError = null;
            state.loginAlert = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.users;
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loginAlert = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.loginError = action.payload;
            state.isAuthenticated = false;
            state.loginAlert = true;
        });
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.signupMessage = action.payload;
            state.signupAlert = true;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMe.pending, (state) => {
            state.loginRequest = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.loginRequest = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            console.log(action.payload);
            state.loginRequest = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        });
    },
});

export const { logout, closeSingupAlert, closeLoginAlert } = authSlice.actions;

export default authSlice.reducer;
