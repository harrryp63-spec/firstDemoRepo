import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authReducer';
import dashboardReducer from './features/dashboard/dashboardReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
    },
    // optional middleware, devTools etc.
});

export default store;

