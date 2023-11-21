import axios from "axios";

export const GET_PROFILE = "GET_PROFILE";

export const getProfile = ({ user, password }) => async (dispatch) => {
        try {
            const profile = await axios.get(`http://localhost:3001/users?email=${user}`);
            dispatch({
                payload: profile.data,
                type: GET_PROFILE
            });
        } catch(error) {
            console.log(error.request.response);
        }
};

export const createUser = ({ email, name, password }) => async (dispatch) => {
    try {
        const profile = await axios.post(`http://localhost:3001/users`,{email, name, password});
        dispatch({
            payload: profile.data,
            type: GET_PROFILE
        });
    } catch(error) {
        console.log(error.request.response);
    }
};