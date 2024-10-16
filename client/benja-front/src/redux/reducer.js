import Project from "../components/Project/Project";
import { 
    COOKIE_SAVED,
    GET_PROFILE, 
    LOGIN,
    LOGOUT,
    SET_SPINNER,
    CREATE_PROJECT,
    CREATE_TECH
} from "./actions";

const initialState = {
    profile: {},
    spinner: false,
    projects: undefined,
    technologies: []
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
            return { ...state, spinner: action.payload };
        case CREATE_PROJECT: 
            return { ...state, projects: action.payload };
        case CREATE_TECH: 
            return { ...state, technologies: [ ...state.technologies, action.payload ] };
        default : return { ...state };
    }
};

export default rootReducer;