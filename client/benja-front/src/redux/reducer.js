import { 
    COOKIE_SAVED,
    GET_PROFILE, 
    LOGIN,
    LOGOUT
} from "./actions";

const initialState = {
    profile: {},
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
            return { ...state, profile: action.payload }
        default : return { ...state };
    }
};

export default rootReducer;