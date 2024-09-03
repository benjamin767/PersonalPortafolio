import axios from "axios";
import setCookie from 'js-cookie';

export const GET_PROFILE = "GET_PROFILE";
export const LOGIN = "LOGIN";
export const COOKIE_SAVED = "COOKIE_SAVED";
export const LOGOUT = "LOGOUT";

axios.defaults.withCredentials = true;

export const getProfile = () => async (dispatch) => {
        try {
            const profile = await axios.get(`http://localhost:3001/users/data`);
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
        const profile = await axios.post(`http://localhost:3001/users`,{ email, name, password });
        dispatch({
            payload: {
                name: profile.data.name,
                id: profile.data.id
            },
            type: GET_PROFILE
        });
    } catch(error) {
        console.log(error.request.response);
        return { 
            error: true,
            data: error.request.response,
        };
    }
};

export const putUser = async (email, name) => {
    try {
        const msg = await axios.put(`http://localhost:3001/users`, { email, name });
        return msg;
    } catch(error) {
        console.log(error.message);
    }   
};

export const login = ({ email, password }) => async (dispatch) => {
    try {
        await axios.post(`http://localhost:3001/users/login`, { 
            email, 
            password,
        }, {
            responseType: "json",
        }).then((res) => {
            dispatch({ 
                type: LOGIN,
                payload: res.data
            });
        });
    } catch(error) {
        console.log(error.message);
        return { 
            error: true,
            data: error.request.response,
        };
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.post("http://localhost:3001/users/logout")
        .then(() => {
            dispatch({
                type: LOGOUT,
                payload: null
            })
        });
    } catch(error) {
        console.log(error.message)
    }
};

export const sendEmail = async ({ email, name, text }) => {
    try {
        await axios.post(`http://localhost:3001/mail`, { email, name, text });
    } catch(error) {
        console.log(error.message);
    }
};

export const saveCookie = (cookieName, cookieValue) => {
    return (dispatch) => {
      setCookie(cookieName, cookieValue);
      dispatch({
        type: COOKIE_SAVED,
        payload: { cookieName, cookieValue }
      });
    };
  };