import { 
    COOKIE_SAVED,
    GET_PROFILE, 
    LOGIN,
    LOGOUT,
    SET_SPINNER
} from "./actions";

const initialState = {
    profile: {},
    spinner: true
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case LOGIN:
            return {
                ...state,
                profile: action.payload
            }
        case COOKIE_SAVED:
            return { ...state, cookies: { ...state.cookies, [action.payload.cookieName]: action.payload.cookieValue } };
        case LOGOUT: 
            return { ...state, profile: action.payload };
        case SET_SPINNER: 
            return { ...state, spinner: !state.spinner };
        default : return { ...state };
    }
};

export default rootReducer;