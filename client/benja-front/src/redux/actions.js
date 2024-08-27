import axios from "axios";
import setCookie from 'js-cookie';

export const GET_PROFILE = "GET_PROFILE";
export const LOGIN = "LOGIN";
export const COOKIE_SAVED = "COOKIE_SAVED";

axios.defaults.withCredentials = true;

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
        const profile = await axios.post(`http://localhost:3001/users`,{ email, name, password });
        dispatch({
            payload: profile.headers["Set-Cookie"],
            type: GET_PROFILE
        });
    } catch(error) {
        console.log(error.request.response);
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
            const cookie = setCookie.get();
            console.log(cookie)
            dispatch({ 
                type: LOGIN,
                payload: cookie
            });
        });
    } catch(error) {
        console.log(error.message);
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