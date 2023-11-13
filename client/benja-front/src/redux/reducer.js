import { 
    GET_PROFILE, 
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
        default : return {...state};
    }
};

export default rootReducer;