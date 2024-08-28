import { 
    COOKIE_SAVED,
    GET_PROFILE, 
    LOGIN
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
        default : return { ...state };
    }
};

export default rootReducer;