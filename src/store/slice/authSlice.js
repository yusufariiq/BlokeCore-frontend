import { createSlice } from "@reduxjs/toolkit";

const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const loadUserFromStorage = () => {
    try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (token && isTokenExpired(token)) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return { user: null, token: null };
        }
            
        return {
            user: storedUser && token ? JSON.parse(storedUser) : null,
            token: token || null
        };
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
};

const { user, token } = loadUserFromStorage();

const initialState = {
    user,
    token,
    loading: false,
    isAuthenticated: !!(user && token),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        loginSuccess: (state, action) => {
            const sanitizedUser = {
                id: action.payload.user.id,
                firstName: action.payload.user.firstName || '',
                lastName: action.payload.user.lastName || '',
                email: action.payload.user.email || '',
                phoneNumber: action.payload.user.phoneNumber || '',
            };
            
            state.user = sanitizedUser;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logoutSuccess: (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        updateUserData: (state, action) => {
            state.user = {...state.user, ...action.payload};
            localStorage.setItem('user', JSON.stringify(state.user));
        },
    },
});

export const { setLoading, loginSuccess, logoutSuccess, updateUserData } = authSlice.actions;
export default authSlice.reducer;
