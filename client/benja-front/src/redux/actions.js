import axios from "axios";

export const GET_PROFILE = "GET_PROFILE";

export const getProfile = ({ name, password }) => async (dispatch) => {
    const profile = await axios.post({ name, password }, "");
};