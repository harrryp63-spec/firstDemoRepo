// store/actions/dashboardActions.js
import { FETCH_DASHBOARD_START, FETCH_DASHBOARD_SUCCESS, FETCH_DASHBOARD_FAILURE } from "../actionTypes";

export const fetchDashboardData = () => async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_START });
    try {
        // Fake API response
        const data = { stats: [10, 20, 30], notifications: 5 };
        dispatch({ type: FETCH_DASHBOARD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_DASHBOARD_FAILURE, payload: "Failed to load dashboard" });
    }
};
