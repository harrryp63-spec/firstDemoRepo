// store/actions/authActions.js
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actionTypes";

export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_START });
    try {
        // Fake API call (replace with real API)
        const user = { id: 1, name: "Ekta", email: credentials.email };
        dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: "Invalid credentials" });
    }
};

export const logout = () => ({ type: LOGOUT });
